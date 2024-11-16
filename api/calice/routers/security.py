from fastapi import APIRouter
from calice.dependencies import AuthenticatedUserCredentials
from calice.models.validation.security import AuthResponse

router = APIRouter(prefix="/oauth")


@router.post("/token", response_model=AuthResponse)
async def request_access_token(token_data: AuthenticatedUserCredentials):
    return token_data
