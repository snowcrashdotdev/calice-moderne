from calice.repositories.base import RepositoryFactory
from calice.models.orm.tournament import Tournament

class TournamentRepository(RepositoryFactory(Tournament)):
    pass