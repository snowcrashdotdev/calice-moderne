from typing_extensions import Self
from uuid import UUID
from datetime import datetime
from pydantic import model_validator
from calice.models.validation.base import Base
from calice.utils import slugify


class TournamentCreate(Base):
    title: str
    description: str
    slug: str = None
    start_time: datetime
    end_time: datetime

    @model_validator(mode="after")
    def auto_slug(self) -> Self:
        self.slug = self.slug if self.slug is not None else slugify(self.title)
        return self
    
    @model_validator(mode="after")
    def ends_after_start(self) -> Self:
        if self.end_time < self.start_time:
            raise ValueError("Start time must precede end time.")
        return self


class TournamentRead(Base):
    id: UUID
    title: str
    description: str
    slug: str
