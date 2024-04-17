from typing_extensions import List
from fastapi import APIRouter

from calice.models import Tournament, CreateTournament
from calice.repositories.tournament import TournamentRepository

router = APIRouter(
    prefix="/tournaments",
    tags=["tournaments"]
)

@router.get("/", response_model=List[Tournament])
async def read_tournaments():
    tournaments = await TournamentRepository.find()

    return tournaments

@router.post("/", response_model=Tournament)
async def create_tournament(tournament: CreateTournament):
    new_tournament = await TournamentRepository.create(tournament)

    return new_tournament

@router.get("/{tournament_slug}", response_model=Tournament)
async def read_tournament(tournament_slug):
    tournament = await TournamentRepository.findOne(tournament_slug)

    return tournament

@router.put("/", response_model=Tournament)
async def update_tournament(tournament: Tournament):
    updated_tournament = await TournamentRepository.update(tournament)

    return updated_tournament