from typing import Annotated
from fastapi import Depends
from .session import SessionRepository as SessionRepositoryClass
from .tournament import TournamentRepository as TournamentRepositoryClass
from .user import UserRepository as UserRepositoryClass
from .base import NotFoundException

SessionRepository = Annotated[SessionRepositoryClass, Depends(SessionRepositoryClass)]
TournamentRepository = Annotated[
    TournamentRepositoryClass, Depends(TournamentRepositoryClass)
]
UserRepository = Annotated[UserRepositoryClass, Depends(UserRepositoryClass)]
