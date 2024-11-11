from sqlalchemy.orm import (
    Mapped,
    mapped_column
)
from calice.models.orm.base import Base, UuidMixin

class User(Base, UuidMixin):
    __tablename__ = "users"
    username: Mapped[str] = mapped_column(unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)