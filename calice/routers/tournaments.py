from fastapi import APIRouter

from calice.models import Tournament

router = APIRouter(
    prefix="/tournaments",
    tags=["tournaments"]
)

@router.get("/", response_model=Tournament)
async def read_tournaments():
    pass

@router.post("/")
async def create_tournament(tournament: Tournament):
    pass