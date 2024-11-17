from datetime import datetime
from uuid import UUID
from pydantic import AliasGenerator, BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


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
