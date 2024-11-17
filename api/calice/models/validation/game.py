from typing import Annotated
from pydantic import Field
from calice.models.validation.base import CreateResource, ReadResource, UpdateResource


class GameRead(ReadResource):
    filename: str = None


class GameCreate(CreateResource):
    filename: Annotated[str, Field(max_length=32)] = None


class GameUpdate(UpdateResource):
    filename: Annotated[str, Field(max_length=32)] = None
