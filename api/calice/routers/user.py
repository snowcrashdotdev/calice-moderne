from typing import List
from fastapi import APIRouter
from calice.dependencies.security import can_manage_user, hash_password
from calice.repositories import user
from calice.models.validation.user import UserCreate, UserNew, UserRead, UserPatch

router = APIRouter(prefix="/users")


@router.get("/", response_model=List[UserRead], dependencies=[can_manage_user])
async def index_users(user_repository: user.repository):
    users = await user_repository.find()

    return users


@router.post("/", response_model=UserRead)
async def signup(
    user: UserCreate,
    user_repository: user.repository,
):
    hashed_password = hash_password(user.password)

    new_user = await user_repository.create(
        UserNew(username=user.username, hashed_password=hashed_password)
    )

    return new_user


@router.patch("/", response_model=UserRead, dependencies=[can_manage_user])
async def patch_user(patch: UserPatch, user_repository: user.repository):
    user = await user_repository.update(patch)

    return user
