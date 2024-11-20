from typing import List
from fastapi import APIRouter
from calice.dependencies.security import can_manage_tournament
from calice.repositories import game
from calice.models.validation.game import (
    GameCreate,
    GameRead,
    GameUpdate,
)

router = APIRouter(prefix="/games", dependencies=[can_manage_tournament])


@router.get("/", response_model=List[GameRead])
async def index_games(game_repository: game.repository):
    games = await game_repository.find()

    return games


@router.post("/", response_model=GameRead)
async def create_game(game: GameCreate, game_repository: game.repository):
    new_game = await game_repository.create(game)

    return new_game


@router.patch("/", response_model=GameRead, dependencies=[can_manage_tournament])
async def update_game(game: GameUpdate, game_repository: game.repository):
    updated_game = await game_repository.update(game)

    return updated_game
