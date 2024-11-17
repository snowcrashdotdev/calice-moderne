from datetime import datetime
from pydantic import Field, field_validator, ValidationInfo
from calice.models.validation.base import CreateResource, ReadResource


class TournamentCreate(CreateResource):
    description: str = Field(max_length=512)
    start_time: datetime
    end_time: datetime

    @field_validator("end_time")
    @classmethod
    def ends_after_start(cls, v: datetime, info: ValidationInfo) -> datetime:
        if v < info.data.get("start_time"):
            raise ValueError("Start time must precede end time.")

        return v


class TournamentRead(ReadResource):
    description: str
    start_time: datetime
    end_time: datetime
