from pydantic import BaseModel
from sqlalchemy import select
from calice.dependencies.database import DatabaseDep
from calice.models.orm.base import Base

def RepositoryFactory(model: Base):
    class BaseRepository:
        def __init__(self, session: DatabaseDep):
            self.session = session

        async def create(self, data: BaseModel):
            db_model = model(**data.model_dump())
            self.session.add(db_model)
            await self.session.commit()
            await self.session.refresh(db_model)

            return db_model
        
        async def find_one(self, *args, **kwargs):
            attr, value = next(iter(kwargs.items()), None)

            q = select(model).where(getattr(model, attr) == value)
            res = await self.session.execute(q)

            return res.unique().scalar_one_or_none()

    BaseRepository.model = model
    
    return BaseRepository