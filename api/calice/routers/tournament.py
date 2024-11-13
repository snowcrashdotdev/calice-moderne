from typing import List
from fastapi import APIRouter
from sqlalchemy import select
from calice.dependencies.database import DatabaseDep
from calice.models.orm.tournament import Tournament
from calice.repositories import TournamentRepository
from calice.models.validation.tournament import TournamentCreate, TournamentRead

router = APIRouter(prefix="/tournaments")


@router.get("/", response_model=List[TournamentRead])
async def index_tournaments(database: DatabaseDep):
    tournaments = await database.scalars(select(Tournament))
    return tournaments.all()


@router.get("/{slug}", response_model=TournamentRead)
async def read_tournament(slug: str, tournament_repository: TournamentRepository):
    tournament = await tournament_repository.find_one(slug=slug)

    return tournament


@router.post("/", response_model=TournamentRead)
async def create_tournament(
    tournament: TournamentCreate, tournament_repository: TournamentRepository
):
    new_tournament = await tournament_repository.create(tournament)

    return new_tournament
