from typing import List, Optional, TYPE_CHECKING
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from calice.models.orm.base import BaseResource

if TYPE_CHECKING:
    from calice.models.orm.ruleset import Ruleset


class Game(BaseResource):
    __tablename__ = "game"

    filename: Mapped[Optional[str]] = mapped_column(String(32))
    rulesets: Mapped[List["Ruleset"]] = relationship(back_populates="game")
