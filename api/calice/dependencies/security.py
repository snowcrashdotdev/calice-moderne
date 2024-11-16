from enum import Enum
from typing import Annotated, Dict, List
from datetime import datetime, timedelta, timezone
import jwt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi import Depends, HTTPException, Security, status
from fastapi.security import (
    OAuth2PasswordBearer,
    OAuth2PasswordRequestForm,
    SecurityScopes,
)
from calice.models.orm import User
from calice.models.validation.security import TokenData
from calice.settings import settings
from calice.repositories import UserRepository

APP_SECRET = settings.app_secret
JWT_ALGORITHM = "HS256"


class OAuth2Scope(str, Enum):
    manage_tournament = "manage:tournament"
    manage_user = "manage:user"


class UserRole(str, Enum):
    user = "USER"
    admin = "ADMIN"


OAUTH2_SCOPES: Dict[OAuth2Scope, str] = {
    OAuth2Scope.manage_tournament: "Create and edit tournaments.",
    OAuth2Scope.manage_user: "Update user roles or remove users.",
}


CAPABILITIES: Dict[UserRole, OAuth2Scope] = {
    UserRole.user: [],
    UserRole.admin: [OAuth2Scope.manage_tournament, OAuth2Scope.manage_user],
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="oauth/token", scopes=OAUTH2_SCOPES)

ph = PasswordHasher()

invalid_credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password.",
    headers={"WWW-Authenticate": "Bearer"},
)


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


async def authenticate_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    user_repository: UserRepository,
):
    user = await user_repository.find_one(username=form_data.username)

    if user is None:
        return user

    try:
        verify_password(user.hashed_password, form_data.password)
    except VerifyMismatchError:
        raise invalid_credentials_exception

    return user


AuthenticatedUser = Annotated[User | None, Depends(authenticate_user)]


async def create_access_token(data: TokenData, expires_delta: timedelta):
    to_encode = data.model_dump()
    to_encode.update({"exp": datetime.now(timezone.utc) + expires_delta})
    encoded_jwt = jwt.encode(to_encode, APP_SECRET, algorithm=JWT_ALGORITHM)

    return encoded_jwt


async def current_user(
    security_scopes: SecurityScopes,
    token: Annotated[str, Depends(oauth2_scheme)],
    user_repository: UserRepository,
):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )

    permissions_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Insufficient privileges to perform action",
        headers={"WWW-Authenticate": authenticate_value},
    )

    try:
        decoded_jwt = jwt.decode(token, APP_SECRET, algorithms=[JWT_ALGORITHM])
        username: str = decoded_jwt.get("sub")
        scopes: List[str] = decoded_jwt.get("scopes")

        if username is None:
            raise credentials_exception

    except jwt.exceptions.InvalidTokenError:
        raise credentials_exception

    user = await user_repository.find_one(username=username)

    if user is None:
        raise credentials_exception

    for scope in security_scopes.scopes:
        if scope not in scopes:
            raise permissions_exception

    return user


can_manage_tournament = Security(current_user, scopes=[OAuth2Scope.manage_tournament])

can_manage_user = Security(current_user, scopes=[OAuth2Scope.manage_user])
