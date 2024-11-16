from datetime import datetime, timezone
from calice.repositories.base import RepositoryFactory
from calice.models.orm import User
from calice.models.orm.session import Session


class SessionRepository(RepositoryFactory(Session)):
    @classmethod
    async def revoke_for_user(cls, user: User):
        await cls.session.run_sync(
            lambda ses: ses.query(Session)
            .filter(Session.user_id == user.id)
            .update({"revoked": datetime.now(timezone.utc)})
        )
        await cls.session.commit()
