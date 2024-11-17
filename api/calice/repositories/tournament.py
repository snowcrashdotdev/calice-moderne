from typing import Annotated
from fastapi import Depends
from sqlalchemy import desc
from calice.repositories.base import RepositoryFactory
from calice.models.orm.tournament import Tournament


class TournamentRepository(RepositoryFactory(Tournament, order_by=desc("end_time"))):
    pass


repository = Annotated[TournamentRepository, Depends(TournamentRepository)]
