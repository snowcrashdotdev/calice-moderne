from typing import Annotated

from fastapi import Depends
from calice.repositories.base import RepositoryFactory
from calice.models.orm.user import User


class UserRepository(RepositoryFactory(User)):
    pass


repository = Annotated[UserRepository, Depends(UserRepository)]
