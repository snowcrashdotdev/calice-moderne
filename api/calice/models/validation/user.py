from typing import List
from uuid import UUID
from pydantic import Field
from calice.models.validation.base import Base
from calice.dependencies import UserRole


class UserCreate(Base):
    username: str = Field(min_length=2)
    password: str = Field(min_length=8, max_length=64)


class UserNew(Base):
    username: str
    hashed_password: str


class UserRead(Base):
    id: UUID
    username: str
    role: List[UserRole] = [UserRole.user]


class UserPatch(Base):
    id: UUID
    role: List[UserRole] = None
