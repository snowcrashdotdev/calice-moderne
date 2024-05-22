from typing_extensions import List
from fastapi import APIRouter
from beanie.odm.operators.update.general import Set

from calice.models import Tournament, CreateTournament

router = APIRouter(
    prefix="/tournaments",
    tags=["tournaments"]
)

@router.get("/", response_model=List[Tournament])
async def read_tournaments():
    tournaments = await Tournament.find().to_list()

    return tournaments

@router.post("/", response_model=Tournament)
async def create_tournament(tournament: CreateTournament):
    new_tournament = Tournament(**tournament.model_dump())
    await new_tournament.insert()

    return new_tournament

@router.get("/{tournament_slug}", response_model=Tournament)
async def read_tournament(tournament_slug):
    tournament = await Tournament.find_one(Tournament.slug == tournament_slug)

    return tournament

@router.put("/", response_model=Tournament)
async def update_tournament(tournament: Tournament):
    updated_tournament = await Tournament.get(tournament.id).update(Set(**tournament.model_dump()))

    return updated_tournament