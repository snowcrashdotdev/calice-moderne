import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from calice.models import Tournament

client = AsyncIOMotorClient(os.environ["DATABASE_URL"])

async def init_db() -> AsyncIOMotorClient :
    await init_beanie(database=client.get_default_database(), document_models=[
        Tournament
    ])

    return client