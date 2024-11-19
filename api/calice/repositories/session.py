from datetime import datetime, timezone
from typing import Annotated
from fastapi import Depends
from calice.repositories import base
from calice.models.orm import Session, User


class SessionRepository(base.RepositoryFactory(Session)):
    @classmethod
    async def revoke_for_user(cls, user: User):
        await cls.session.run_sync(
            lambda ses: ses.query(Session)
            .filter(Session.user_id == user.id)
            .update({"revoked": datetime.now(timezone.utc)})
        )
        await cls.session.commit()


repository = Annotated[SessionRepository, Depends(SessionRepository)]
