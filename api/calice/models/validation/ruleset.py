from enum import Enum
from typing import Annotated
from pydantic import Field
from uuid import UUID
from .base import Base

class RulesetType(str, Enum):
    score = "SCORE"
    speedrun = "SPEEDRUN"

class RulesetCreate(Base):
    game_id: UUID
    title: Annotated[str, Field(max_length=64)]
    type: RulesetType
    description: Annotated[str, Field(max_length=512)]

class RulesetUpdate(Base):
    id: UUID
    title: Annotated[str, Field(max_length=64)] = None
    type: RulesetType = None
    description: Annotated[str, Field(max_length=512)] = None

class RulesetRead(Base):
    id: UUID
    title: str
    type: RulesetType
    description: str