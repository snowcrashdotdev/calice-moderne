from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from calice.database import init_db
from calice.routers import tournaments

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database client
    db = await init_db()
    yield
    # Close database connection(s)
    db.close()

app = FastAPI(
    root_path="/api",
    lifespan=lifespan
)

@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse("/api/docs")

app.include_router(tournaments.router)