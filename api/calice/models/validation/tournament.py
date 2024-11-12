from typing import Optional
from uuid import UUID
from datetime import datetime
from calice.models.validation.base import Base

class TournamentCreate(Base):
    title: str
    description: str
    slug: Optional[str]
    start_time: datetime
    end_time: datetime

class TournamentRead(Base):
    id: UUID
    title: str
    description: str
    slug: str
