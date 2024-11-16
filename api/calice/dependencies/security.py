from secrets import token_urlsafe
from typing import Annotated, Dict, List, Tuple, Union
from datetime import datetime, timedelta, timezone
import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi import Depends, Form, HTTPException, Security, status
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestFormStrict,
    SecurityScopes,
)
from calice.models.orm import User
from calice.models.validation.security import (
    AuthResponse,
    CreateSession,
    AccessToken,
    OAuth2Scope,
    UserRole,
)
from calice.settings import settings
from calice.repositories import SessionRepository, UserRepository, NotFoundException

APP_SECRET = settings.app_secret
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 30
REFRESH_TOKEN_EXPIRES_DAYS = 60
REFRESH_TOKEN_BYTES = 32

ph = PasswordHasher()

OAUTH2_SCOPES: Dict[OAuth2Scope, str] = {
    OAuth2Scope.manage_tournament: "Create and edit tournaments.",
    OAuth2Scope.manage_user: "Update user roles or remove users.",
}


CAPABILITIES: Dict[UserRole, OAuth2Scope] = {
    UserRole.user: [],
    UserRole.admin: [OAuth2Scope.manage_tournament, OAuth2Scope.manage_user],
}


class OAuth2PasswordWithRefresh(OAuth2PasswordRequestFormStrict):
    """Modified from fastapi.security.OAuth2PasswordRequestFormStrict"""

    def __init__(
        self,
        grant_type: Annotated[
            str,
            Form(pattern="password|refresh_token"),
        ],
        username: Annotated[
            Union[str, None],
            Form(),
        ] = None,
        password: Annotated[
            Union[str, None],
            Form(),
        ] = None,
        refresh_token: Annotated[
            Union[str, None],
            Form(),
        ] = None,
        scope: Annotated[
            str,
            Form(),
        ] = "",
        client_id: Annotated[
            Union[str, None],
            Form(),
        ] = None,
        client_secret: Annotated[
            Union[str, None],
            Form(),
        ] = None,
    ):
        super().__init__(
            grant_type=grant_type,
            username=username,
            password=password,
            scope=scope,
            client_id=client_id,
            client_secret=client_secret,
        )
        self.refresh_token = refresh_token


def get_capabilities(roles: List[UserRole]):
    capabilities: List[OAuth2Scope] = []

    for role in roles:
        capabilities += CAPABILITIES[role]

    return " ".join(capabilities)


def hash_password(password: str):
    return ph.hash(password)


def verify_password(hash: str, password: str):
    valid = ph.verify(hash, password)

    if ph.check_needs_rehash(hash):
        pass

    return valid


class FailedLoginException(HTTPException):
    def __init__(
        self,
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication failed",
        headers=None,
    ):
        super().__init__(status_code, detail, headers)


class InvalidCredentialsException(HTTPException):
    def __init__(
        self,
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    ):
        super().__init__(status_code, detail, headers)


class InsufficientPermissionsException(HTTPException):
    def __init__(
        self,
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Insufficient level of permissions to perform requested action",
        headers={"WWW-Authenticate": "Bearer"},
    ):
        super().__init__(status_code, detail, headers)


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="oauth/token", scopes=OAUTH2_SCOPES, auto_error=False
)

BearerToken = Annotated[Union[str, None], Depends(oauth2_scheme)]


def create_access_token(user: User, expires: datetime):
    to_encode = AccessToken(
        sub=str(user.id),
        name=user.username,
        iat=datetime.now(timezone.utc),
        exp=expires,
        scopes=get_capabilities(user.role).strip(),
    )
    encoded_jwt = jwt.encode(
        to_encode.model_dump(exclude_unset=True), APP_SECRET, algorithm=JWT_ALGORITHM
    )

    return encoded_jwt


async def authenticate_user(
    form_data: Annotated[OAuth2PasswordWithRefresh, Depends()],
    user_repository: UserRepository,
    session_repository: SessionRepository,
):

    new_session = None
    user = None

    """
    Attempt to acquire a user and new session through either of the two available flows.
    """
    if form_data.grant_type == "refresh_token":
        if form_data.refresh_token is None:
            raise FailedLoginException(
                detail="No refresh token was included in the request.",
            )

        session = await session_repository.find_one(token=form_data.refresh_token)

        if not session:
            raise FailedLoginException

        if session.revoked or session.replaced_by:
            """
            The client is attempting to re-use a refresh token.
            """
            raise FailedLoginException(
                detail="Attempted reuse of revoked refresh token",
            )

        """
        Rotate refresh tokens.
        """
        new_session = await SessionRepository.create(
            CreateSession(
                token=token_urlsafe(REFRESH_TOKEN_BYTES),
                user_id=session.user_id,
                expires=datetime.now(timezone.utc)
                + timedelta(days=REFRESH_TOKEN_EXPIRES_DAYS),
            )
        )

        session.replaced_by = new_session.token
        await SessionRepository.update(instance=session)
        user = await user_repository.find_one(id=new_session.user_id)

    elif form_data.grant_type == "password":
        mismatch_exception = FailedLoginException(
            detail="Incorrect username or password"
        )

        user = await user_repository.find_one(username=form_data.username)
        if not user:
            raise mismatch_exception

        try:
            verify_password(user.hashed_password, form_data.password)
        except VerifyMismatchError:
            raise mismatch_exception

        new_session = await session_repository.create(
            CreateSession(
                token=token_urlsafe(REFRESH_TOKEN_BYTES),
                user_id=user.id,
                expires=datetime.now(timezone.utc)
                + timedelta(days=REFRESH_TOKEN_EXPIRES_DAYS),
            )
        )

    if user and new_session:
        expires = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRES_MINUTES
        )
        access_token = create_access_token(user, expires=expires)
        refresh_token = new_session.token

        return AuthResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires=expires,
            refresh_token_expires=new_session.expires,
        )
    else:
        raise FailedLoginException


AuthenticatedUserCredentials = Annotated[AuthResponse, Depends(authenticate_user)]


def auth_exceptions(security_scopes: SecurityScopes):
    header_value = (
        f'Bearer scope={security_scopes.scope_str}"'
        if security_scopes.scopes
        else "Bearer"
    )

    credentials_exception = InvalidCredentialsException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": header_value},
    )

    permissions_exception = InsufficientPermissionsException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Insufficient privileges to perform action",
        headers={"WWW-Authenticate": header_value},
    )

    return (credentials_exception, permissions_exception)


WithAuthExceptions = Annotated[
    Tuple[InvalidCredentialsException, InsufficientPermissionsException],
    Depends(auth_exceptions),
]


def decode_token(token: str) -> AccessToken:
    return AccessToken(**jwt.decode(token, APP_SECRET, algorithms=[JWT_ALGORITHM]))


def validate_token(
    token: BearerToken,
    security_scopes: SecurityScopes,
    auth_exceptions: WithAuthExceptions,
) -> AccessToken:
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    (credentials_exception, permissions_exception) = auth_exceptions

    try:
        decoded_jwt = decode_token(token)
    except jwt.exceptions.InvalidTokenError:
        raise credentials_exception

    for scope in security_scopes.scopes:
        if scope not in decoded_jwt.scopes:
            raise permissions_exception

    return decoded_jwt


JSONWebToken = Annotated[BearerToken, Depends(validate_token)]


async def current_user(
    token: JSONWebToken,
    user_repository: UserRepository,
    auth_exceptions: WithAuthExceptions,
):
    (credentials_exception) = auth_exceptions

    try:
        user = await user_repository.find_one(id=token.sub)
    except NotFoundException:
        raise credentials_exception

    return user


can_manage_tournament = Security(current_user, scopes=[OAuth2Scope.manage_tournament])

can_manage_user = Security(current_user, scopes=[OAuth2Scope.manage_user])
