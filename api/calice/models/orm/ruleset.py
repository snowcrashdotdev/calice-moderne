import uuid
from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from calice.models.orm import Base
from calice.models.orm.base import UuidMixin, TimestampMixin

if TYPE_CHECKING:
    from .game import Game

class Ruleset(Base, UuidMixin, TimestampMixin):
    __tablename__ = "ruleset"

    title: Mapped[str] = mapped_column(String(64))
    description: Mapped[str]

    game: Mapped["Game"] = relationship("Game", back_populates="rulesets")
    game_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("game.id"))