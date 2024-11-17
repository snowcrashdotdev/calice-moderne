from typing import List, Type, TypeVar, Union
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy import UnaryExpression
from calice.dependencies import DatabaseSession
from calice.models.orm import Base as ORMModel

Model = TypeVar("Model", bound=ORMModel)
ModelClass = Type[Model]
DataModel = TypeVar("DataModel", bound=BaseModel)


class NotFoundException(Exception):
    pass


def RepositoryFactory(model: ModelClass, order_by: UnaryExpression = None):
    class BaseRepository:
        LIMIT = 100

        def __init__(self, session: DatabaseSession):
            BaseRepository.session = session
            BaseRepository.model = model
            BaseRepository.order_by = order_by

        @classmethod
        async def create(cls, data: DataModel) -> Model:
            db_model: Model = model(**data.model_dump())
            cls.session.add(db_model)
            await cls.session.commit()
            await cls.session.refresh(db_model)

            return db_model

        @classmethod
        async def find(cls, offset=0) -> List[Model]:
            q = select(model).order_by(cls.order_by).limit(cls.LIMIT).offset(offset)
            res = await cls.session.scalars(q)

            return res.all()

        @classmethod
        async def find_one(self, *args, **kwargs) -> Union[Model, None]:
            attr, value = next(iter(kwargs.items()), None)

            q = select(model).where(getattr(model, attr) == value)
            res = await self.session.execute(q)

            return res.unique().scalar_one_or_none()

        @classmethod
        async def update(cls, data: DataModel = None, instance: Model = None) -> Model:
            db_model = instance if instance else await cls.find_one(id=data.id)

            if not db_model:
                raise NotFoundException(
                    f"{model.__tablename__} did not contain row with id {data.id}"
                )

            if data:
                values = data.model_dump(exclude_unset=True)
                for attr, value in values.items():
                    setattr(db_model, attr, value)

            await cls.session.commit()
            await cls.session.refresh(db_model)

            return db_model

    return BaseRepository
