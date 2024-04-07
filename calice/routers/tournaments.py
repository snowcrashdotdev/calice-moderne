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