
from typing import List
from fastapi import FastAPI
from fastapi.responses import FileResponse
from sqlalchemy import select
from .dependencies.database import DatabaseDep
from .models.orm.tournament import Tournament
from .models.validation.tournament import TournamentRead

app = FastAPI()

@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse('./calice/favicon.ico')

@app.get("/", response_model=List[TournamentRead])
async def read_root(database: DatabaseDep):
    tournaments = await database.scalars(select(Tournament))
    return tournaments.all()