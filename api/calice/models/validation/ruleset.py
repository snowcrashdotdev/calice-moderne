from typing import Annotated
from pydantic import Field
from uuid import UUID
from .base import Base

class RulesetCreate(Base):
    game_id: UUID
    title: Annotated[str, Field(max_length=64)]
    description: Annotated[str, Field(max_length=512)]

class RulesetUpdate(Base):
    id: UUID
    title: Annotated[str, Field(max_length=64)] = None
    description: Annotated[str, Field(max_length=512)] = None

class RulesetRead(Base):
    id: UUID
    title: str
    description: str