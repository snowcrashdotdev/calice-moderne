from typing import TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from calice.models.orm.base import Base, UuidMixin, TimestampMixin

if TYPE_CHECKING:
    from calice.models.orm.game import Game

class Ruleset(Base, UuidMixin, TimestampMixin):
    __tablename__ = "ruleset"

    game = Mapped["Game"] = relationship(back_populates="rulesets")
    title = Mapped[str] = mapped_column(String(64))
    description = Mapped[str]