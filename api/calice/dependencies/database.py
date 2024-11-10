from typing import Annotated
from sqlalchemy import exc
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from fastapi import Depends
from calice.models.orm.base import Base
from calice.settings import settings

async def get_db():
    engine = create_async_engine(settings.database_url)
    factory = async_sessionmaker(engine)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with factory() as session:
        try:
            yield session
            await session.commit()
        except exc.SQLAlchemyError as error:
            await session.rollback()
            raise error

DatabaseDep = Annotated[AsyncSession, Depends(get_db)]