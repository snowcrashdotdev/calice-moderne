from typing import Optional
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from calice.models.orm import BaseResource


class Game(BaseResource):
    __tablename__ = "games"

    filename: Mapped[Optional[str]] = mapped_column(String(32))
