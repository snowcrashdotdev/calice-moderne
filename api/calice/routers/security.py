from datetime import timedelta
from fastapi import APIRouter
from calice.dependencies import AuthenticatedUser
from calice.dependencies.security import (
    get_capabilities,
    create_access_token,
    invalid_credentials_exception,
)
from calice.models.validation.security import Token, TokenData

JWT_EXPIRE_MINUTES = 15

router = APIRouter(
    prefix="/oauth"
)


@router.post("/token", response_model=Token)
async def request_access_token(user: AuthenticatedUser):
    if user is None:
        raise invalid_credentials_exception

    access_token = await create_access_token(
        data=TokenData(sub=user.username, scopes=get_capabilities(user.role)),
        expires_delta=timedelta(minutes=JWT_EXPIRE_MINUTES),
    )

    return Token(access_token=access_token, token_type="bearer")
