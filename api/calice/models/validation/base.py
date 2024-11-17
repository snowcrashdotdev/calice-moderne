from datetime import datetime
from typing import Annotated, Self
from uuid import UUID
from pydantic import AliasGenerator, BaseModel, ConfigDict, Field, model_validator
from pydantic.alias_generators import to_camel
from calice.utils import slugify


class Base(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True,
        alias_generator=AliasGenerator(alias=to_camel),
    )


class ReadResource(Base):
    id: UUID
    created_at: datetime
    updated_at: datetime
    title: str
    slug: str


class CreateResource(Base):
    title: Annotated[str, Field(max_length=64)]
    slug: Annotated[str, Field(max_length=64)] = None

    @model_validator(mode="after")
    def auto_slug(self) -> Self:
        self.slug = self.slug if self.slug else slugify(self.title)

        return self


class UpdateResource(Base):
    id: UUID
    title: str = Field(default=None, max_length=64)
    slug: str = Field(default=None, max_length=64)
