from calice.models.validation.base import Base


class Token(Base):
    access_token: str
    token_type: str


class TokenData(Base):
    sub: str
    scopes: str = []


class ReadToken(Base):
    username: str
