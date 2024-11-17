from typing import List
from fastapi import APIRouter
from calice.dependencies.security import can_manage_tournament
from calice.repositories import tournament
from calice.models.validation.tournament import TournamentCreate, TournamentRead

router = APIRouter(prefix="/tournaments")


@router.get("/", response_model=List[TournamentRead])
async def index_tournaments(tournament_repository: tournament.repository):
    tournaments = await tournament_repository.find()

    return tournaments


@router.get("/{slug}", response_model=TournamentRead)
async def read_tournament(slug: str, tournament_repository: tournament.repository):
    tournament = await tournament_repository.find_one(slug=slug)

    return tournament


@router.post("/", response_model=TournamentRead, dependencies=[can_manage_tournament])
async def create_tournament(
    tournament: TournamentCreate,
    tournament_repository: tournament.repository,
):
    new_tournament = await tournament_repository.create(tournament)

    return new_tournament
