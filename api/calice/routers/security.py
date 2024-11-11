from typing import Annotated
from argon2 import PasswordHasher
from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from calice.models.validation.user import UserCreate, UserNew, UserRead
from calice.repositories.user import UserRepository

router = APIRouter()

oauth2scheme = OAuth2PasswordBearer(tokenUrl="token")

ph = PasswordHasher()

def hash_password(password: str):
    return ph.hash(password)

def verify_password(hash: str, password: str):
    valid = ph.verify(hash, password)

    if ph.check_needs_rehash(hash):
        pass

    return valid

@router.post("/token")
async def token():
    pass

@router.post("/signup", response_model=UserRead)
async def signup(user: UserCreate, user_repository: Annotated[UserRepository, Depends(UserRepository)]):
    hashed_password = hash_password(user.password)

    new_user = await user_repository.create(
        UserNew(username=user.username, hashed_password=hashed_password)
    )

    return new_user