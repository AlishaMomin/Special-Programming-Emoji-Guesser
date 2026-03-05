from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional


class GameBase(BaseModel):
    status: Optional[str] = "in_progress"


class GameCreate(GameBase):
    pass


class Game(GameBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
