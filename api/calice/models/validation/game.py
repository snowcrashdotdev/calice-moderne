from typing import Annotated, List
from pydantic import Field
from calice.models.validation.base import CreateResource, ReadResource, UpdateResource
from calice.models.validation.ruleset import RulesetRead


class GameRead(ReadResource):
    image_url: str = None
    filename: str = None
    rulesets: List[RulesetRead] = []


class GameFields:
    image_url: Annotated[str, Field(max_length=2048)] = None
    filename: Annotated[str, Field(max_length=32)] = None


class GameCreate(GameFields, CreateResource):
    pass


class GameUpdate(GameFields, UpdateResource):
    pass
