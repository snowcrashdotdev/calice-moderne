from pydantic import BaseModel
from uuid import UUID

class TournamentRead(BaseModel):
    id: UUID
    title: str
    slug: str

    class Config:
       from_attributes = True