from calice.models.validation.base import Base
from uuid import UUID


class TournamentRead(Base):
    id: UUID
    title: str
    slug: str
