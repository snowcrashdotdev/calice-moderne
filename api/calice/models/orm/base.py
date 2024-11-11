from sqlalchemy import String
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column
)
import uuid

class Base(DeclarativeBase):
    pass

class UuidMixin:
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4(), nullable=False)

class Resource(UuidMixin):
    title: Mapped[str] = mapped_column(String(64), nullable=False)
    slug: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)

class BaseResource(Base, Resource):
    __abstract__ = True
    