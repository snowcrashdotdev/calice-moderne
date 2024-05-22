from datetime import datetime
from typing_extensions import Annotated, Optional, Union

from beanie import Document, Indexed
from pydantic import BaseModel, BeforeValidator, Field, validator

from calice.utils import slugify

class Resource(BaseModel):
    title: str
    slug: Optional[str] = Field(default=None)

    @validator("slug", pre=True, always=True)
    def default_slug(cls, v, *, values, **kwargs):
        return v or slugify(values.get("title"))

class BaseTournament(Resource):
    description: Optional[str] = None
    start: datetime
    end: datetime

class CreateTournament(BaseTournament):
    pass

class Tournament(BaseTournament, Document):
    slug: Annotated[str, Indexed(unique=True)]

    class Settings:
        name = "tournaments"
