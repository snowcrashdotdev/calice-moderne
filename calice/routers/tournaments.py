from typing import Union

from pydantic import BaseModel
from datetime import datetime
from fastapi import APIRouter

class Tournament(BaseModel):
    title: str
    description: Union[str, None] = None
    start: datetime
    end: datetime

router = APIRouter(
    prefix="/tournaments",
    tags=["tournaments"]
)

@router.get("/")
async def read_tournaments():
    pass

@router.post("/")
async def create_tournament(tournament: Tournament):
    pass