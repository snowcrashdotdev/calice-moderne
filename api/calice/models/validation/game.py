from typing import Annotated, List
from pydantic import Field
from calice.models.validation.base import CreateResource, ReadResource, UpdateResource
from calice.models.validation.ruleset import RulesetRead


class GameRead(ReadResource):
    filename: str = None
    rulesets: List[RulesetRead] = []


class GameCreate(CreateResource):
    filename: Annotated[str, Field(max_length=32)] = None


class GameUpdate(UpdateResource):
    filename: Annotated[str, Field(max_length=32)] = None
