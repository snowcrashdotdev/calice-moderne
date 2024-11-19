from typing import Annotated
from fastapi import Depends
from calice.repositories.base import RepositoryFactory
from calice.models.orm.tournament import Tournament


class TournamentRepository(RepositoryFactory(Tournament, order_by=Tournament.end_time.desc())):
    pass


repository = Annotated[TournamentRepository, Depends(TournamentRepository)]
