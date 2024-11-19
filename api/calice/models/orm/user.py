from typing import List
from sqlalchemy.orm import (
    Mapped,
    mapped_column
)
from sqlalchemy.types import (
    ARRAY,
    String
)
from calice.models.orm.base import Base, UuidMixin

class User(Base, UuidMixin):
    __tablename__ = "user"
    username: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    role: Mapped[List[str]] = mapped_column(ARRAY(String), default=["USER"])