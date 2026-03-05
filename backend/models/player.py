from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional


class PlayerCreate(BaseModel):
    name: str
    age: int = Field(..., ge=1, le=120)
    avatar: str
    player_number: int = Field(..., ge=1, le=2)


class PlayerUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = Field(None, ge=1, le=120)
    avatar: Optional[str] = None
    starter_score: Optional[int] = Field(None, ge=0, le=5)
    main_score: Optional[int] = Field(None, ge=0, le=4)


class Player(PlayerCreate):
    id: str
    game_id: str
    starter_score: int = 0
    main_score: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
