from typing import Annotated
from datetime import datetime, timedelta, timezone
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import jwt
from calice.settings import settings
from calice.models.validation.security import ReadToken, Token, TokenData
from calice.models.validation.user import UserCreate, UserNew, UserRead
from calice.models.orm.user import User
from calice.repositories.user import UserRepository

APP_SECRET = settings.app_secret
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 15

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

ph = PasswordHasher()

invalid_credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Incorrect username or password.",
    headers={"WWW-Authenticate": "Bearer"}
)

async def hash_password(password: str):
    return ph.hash(password)

async def verify_password(hash: str, password: str):
    valid = ph.verify(hash, password)

    if ph.check_needs_rehash(hash):
        pass

    return valid

async def authenticate_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], user_repository: Annotated[UserRepository, Depends(UserRepository)]):
    user = await user_repository.find_one(username=form_data.username)

    if user is None: return user

    try:
        await verify_password(user.hashed_password, form_data.password)
    except VerifyMismatchError:
        raise invalid_credentials_exception

    return user

async def create_access_token(data: TokenData, expires_delta: timedelta):
    to_encode = data.model_dump()
    to_encode.update({"exp": datetime.now(timezone.utc) + expires_delta})
    encoded_jwt = jwt.encode(to_encode, APP_SECRET, algorithm=JWT_ALGORITHM)

    return encoded_jwt

async def current_user(token: Annotated[str, Depends(oauth2_scheme)], user_repository: Annotated[UserRepository, Depends(UserRepository)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        decoded_jwt = jwt.decode(token, APP_SECRET, algorithms=[JWT_ALGORITHM])
        username: str = decoded_jwt.get("sub")

        if username is None: raise credentials_exception

        token_data = ReadToken(username=username)
    except jwt.exceptions.InvalidTokenError:
        raise credentials_exception
    
    user = user_repository.find_one(username=token_data.username)

    if user is None: raise credentials_exception

    return user

@router.post("/token", response_model=Token)
async def request_access_token(user: Annotated[User | None, Depends(authenticate_user)]):
    if user is None:
        raise invalid_credentials_exception

    access_token =  await create_access_token(
        data=TokenData(sub=user.username),
        expires_delta=timedelta(minutes=JWT_EXPIRE_MINUTES)
    )

    return Token(
        access_token=access_token,
        token_type="bearer"
    )

@router.post("/signup", response_model=UserRead)
async def signup(user: UserCreate, user_repository: Annotated[UserRepository, Depends(UserRepository)]):
    hashed_password = hash_password(user.password)

    new_user = await user_repository.create(
        UserNew(username=user.username, hashed_password=hashed_password)
    )

    return new_user