from sqlalchemy import (
    String
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column
)
import uuid

class Base(DeclarativeBase):
    pass

class Resource:
    id: Mapped[uuid.UUID] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(64))
    slug: Mapped[str] = mapped_column(String(64), unique=True)

class BaseResource(Base, Resource):
    __abstract__ = True
    pass
    