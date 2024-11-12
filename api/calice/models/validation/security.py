from calice.models.validation.base import Base


class Token(Base):
    access_token: str
    token_type: str


class TokenData(Base):
    sub: str


class ReadToken(Base):
    username: str
