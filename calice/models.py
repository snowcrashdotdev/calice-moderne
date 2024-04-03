from datetime import datetime
from typing_extensions import Annotated, Optional, Union

from pydantic import BaseModel, BeforeValidator, Field, validator

from calice.utils import slugify

PyObjectId = Annotated[str, BeforeValidator(str)]

class MongoDocument(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

class Resource(BaseModel):
    title: str
    slug: str = Field(default=None)

    @validator("slug", pre=True, always=True)
    def default_slug(cls, v, *, values, **kwargs):
        return slugify(v) or slugify(values.get("title"))

class BaseTournament(Resource):
    description: Union[str, None] = None
    start: datetime
    end: datetime

class Tournament(BaseTournament, MongoDocument):
    pass
