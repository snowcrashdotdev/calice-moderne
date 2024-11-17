from fastapi import APIRouter
from calice.repositories import game
from calice.models.validation.game import GameRead

router = APIRouter(prefix="/games")


@router.get("/", response_model=GameRead)
async def index_games(game_repository: game.repository):
    games = await game_repository.find()

    return games
