from uuid import UUID, uuid4
from datetime import datetime
from sqlalchemy.sql import expression
from sqlalchemy.ext.compiler import compiles
from sqlalchemy import String, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class utcnow(expression.FunctionElement):
    type = DateTime()
    inherit_cache = True


@compiles(utcnow, "postgresql")
def pg_utcnow(element, compiler, **kw):
    return "TIMEZONE('utc', CURRENT_TIMESTAMP)"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, server_default=utcnow()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, nullable=True, server_default=utcnow(), server_onupdate=utcnow()
    )


class UuidMixin:
    id: Mapped[UUID] = mapped_column(primary_key=True, default=uuid4(), nullable=False)


class Resource(UuidMixin, TimestampMixin):
    title: Mapped[str] = mapped_column(String(64), nullable=False)
    slug: Mapped[str] = mapped_column(
        String(64), unique=True, index=True, nullable=False
    )


class BaseResource(Base, Resource):
    __abstract__ = True
