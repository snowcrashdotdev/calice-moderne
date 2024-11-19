from typing import Annotated
from fastapi import Depends
from sqlalchemy import select
from calice.models.orm import Ruleset
from .base import RepositoryFactory

class RulesetRepository(RepositoryFactory(Ruleset)):
    @classmethod
    async def for_game(cls, game_id: str):
        q = select(cls.model).where(cls.model.game_id == game_id)

        res = await cls.session.scalars(q)

        return res.all()

repository = Annotated[RulesetRepository, Depends(RulesetRepository)]