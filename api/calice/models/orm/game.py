from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from calice.models.orm import BaseResource

if TYPE_CHECKING:
    from .ruleset import Ruleset


class Game(BaseResource):
    __tablename__ = "game"

    filename: Mapped[Optional[str]] = mapped_column(String(32))
    rulesets: Mapped[List["Ruleset"]] = relationship("Ruleset", back_populates="game")
