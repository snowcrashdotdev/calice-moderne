from typing import List
from fastapi import APIRouter
from calice.repositories import UserRepository
from calice.models.validation.user import UserRead, UserPatch

router = APIRouter(prefix="/users")


@router.get("/", response_model=List[UserRead])
async def index_users(user_repository: UserRepository):
    users = await user_repository.find()

    return users


@router.patch("/", response_model=UserRead)
async def patch_user(patch: UserPatch, user_repository: UserRepository):
    user = await user_repository.update(patch)

    return user
