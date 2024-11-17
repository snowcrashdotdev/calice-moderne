from fastapi import FastAPI
from fastapi.responses import FileResponse
from calice.routers import (
    game,
    security,
    tournament,
    user
)

app = FastAPI()

@app.get('/favicon.ico', include_in_schema=False)
async def favicon():
    return FileResponse('./calice/favicon.ico')

app.include_router(game.router)
app.include_router(security.router)
app.include_router(tournament.router)
app.include_router(user.router)