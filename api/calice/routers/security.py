from datetime import timedelta
from fastapi import APIRouter
from calice.dependencies import AuthenticatedUser
from calice.dependencies.security import (
    get_capabilities,
    create_access_token,
    hash_password,
    invalid_credentials_exception,
)
from calice.models.validation.security import Token, TokenData
from calice.models.validation.user import UserCreate, UserNew, UserRead
from calice.repositories import UserRepository

JWT_EXPIRE_MINUTES = 15

router = APIRouter()


@router.post("/token", response_model=Token)
async def request_access_token(user: AuthenticatedUser):
    if user is None:
        raise invalid_credentials_exception

    access_token = await create_access_token(
        data=TokenData(sub=user.username, scopes=get_capabilities(user.role)),
        expires_delta=timedelta(minutes=JWT_EXPIRE_MINUTES),
    )

    return Token(access_token=access_token, token_type="bearer")


@router.post("/signup", response_model=UserRead)
async def signup(
    user: UserCreate,
    user_repository: UserRepository,
):
    hashed_password = hash_password(user.password)

    new_user = await user_repository.create(
        UserNew(username=user.username, hashed_password=hashed_password)
    )

    return new_user
