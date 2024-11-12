from typing import Annotated
from fastapi import Depends
from .tournament import TournamentRepository as TournamentRepositoryClass
from .user import UserRepository as UserRepositoryClass

UserRepository = Annotated[UserRepositoryClass, Depends(UserRepositoryClass)]
TournamentRepository = Annotated[TournamentRepositoryClass, Depends(TournamentRepositoryClass)]