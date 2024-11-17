from enum import Enum
from uuid import UUID
from datetime import datetime
from pydantic import Field, BaseModel, field_validator


class OAuth2Scope(str, Enum):
    manage_tournament = "manage:tournament"
    manage_user = "manage:user"


class UserRole(str, Enum):
    user = "USER"
    admin = "ADMIN"


class AccessToken(BaseModel):
    sub: str
    name: str = ""
    iat: datetime
    exp: datetime
    scopes: str = ""
    jti: str = None
    iss: str = None
    aud: str = None
    nbf: int = None

    @field_validator("scopes")
    def has_valid_scopes(v: str):
        if v and not all([scope in [s for s in OAuth2Scope] for scope in v.split(" ")]):
            raise ValueError("Scopes contains an unrecognized value")

        return v


class CreateSession(BaseModel):
    token: str = Field(min_length=36)
    user_id: UUID
    expires: datetime


class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "Bearer"
    expires: datetime
    refresh_token_expires: datetime
