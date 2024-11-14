from pydantic import Field
from calice.models.validation.base import Base


class UserCreate(Base):
    username: str = Field(min_length=2)
    password: str = Field(min_length=8, max_length=64)


class UserNew(Base):
    username: str
    hashed_password: str


class UserRead(Base):
    username: str
