import uuid
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import (
    UUID,
    DateTime,
    String,
)
from calice.models.orm import Base
from calice.models.orm.base import UuidMixin


class Session(Base, UuidMixin):
    __tablename__ = "session"
    token: Mapped[str] = mapped_column(String, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True))
    expires: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    replaced_by: Mapped[str] = mapped_column(String, nullable=True, default=None)
    revoked: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=True, default=None
    )
