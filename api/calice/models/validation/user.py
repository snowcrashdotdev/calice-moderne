from calice.models.validation.base import Base


class UserCreate(Base):
    username: str
    password: str


class UserNew(Base):
    username: str
    hashed_password: str


class UserRead(Base):
    username: str
