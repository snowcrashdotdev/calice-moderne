from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from calice.routers import tournaments

app = FastAPI(
    root_path="/api"
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse("/api/docs")

app.include_router(tournaments.router)