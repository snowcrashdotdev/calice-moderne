from calice.dependencies.database import DatabaseDep
from calice.models.orm.base import Base
from pydantic import BaseModel

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

    
    BaseRepository.model = model
    
    return BaseRepository