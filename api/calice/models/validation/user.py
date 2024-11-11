from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserNew(BaseModel):
    username: str
    hashed_password: str


class UserRead(BaseModel):
    username: str
    
    class Config:
       from_attributes = True