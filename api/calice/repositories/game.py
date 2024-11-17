from typing import Annotated

from fastapi import Depends
from calice.repositories.base import RepositoryFactory
from calice.models.orm import Game


class GameRepository(RepositoryFactory(Game)):
    pass


repository = Annotated[GameRepository, Depends(GameRepository)]
