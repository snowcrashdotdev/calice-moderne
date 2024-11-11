from typing import List
from fastapi import APIRouter
from sqlalchemy import select
from calice.dependencies.database import DatabaseDep
from calice.models.orm.tournament import Tournament
from calice.models.validation.tournament import TournamentRead

router = APIRouter(
    prefix="/tournaments"
)

@router.get("/", response_model=List[TournamentRead])
async def read_root(database: DatabaseDep):
    tournaments = await database.scalars(select(Tournament))
    return tournaments.all()