from typing import List
from enum import Enum
from uuid import UUID
from pydantic import Field
from calice.models.validation.base import Base

class RoleEnum(str, Enum):
    user = "USER"
    admin = "ADMIN"


class UserCreate(Base):
    username: str = Field(min_length=2)
    password: str = Field(min_length=8, max_length=64)


class UserNew(Base):
    username: str
    hashed_password: str


class UserRead(Base):
    id: UUID
    username: str
    role: List[RoleEnum] = [RoleEnum.user]

class UserPatch(Base):
    id: UUID
    role: List[RoleEnum] = None