from typing import List
from fastapi import APIRouter
from calice.dependencies.security import can_manage_user, hash_password
from calice.repositories import UserRepository
from calice.models.validation.user import UserCreate, UserNew, UserRead, UserPatch

router = APIRouter(prefix="/users")


@router.get("/", response_model=List[UserRead])
async def index_users(user_repository: UserRepository):
    users = await user_repository.find()

    return users


@router.post("/", response_model=UserRead)
async def signup(
    user: UserCreate,
    user_repository: UserRepository,
):
    hashed_password = hash_password(user.password)

    new_user = await user_repository.create(
        UserNew(username=user.username, hashed_password=hashed_password)
    )

    return new_user


@router.patch("/", response_model=UserRead, dependencies=[can_manage_user])
async def patch_user(patch: UserPatch, user_repository: UserRepository):
    user = await user_repository.update(patch)

    return user
