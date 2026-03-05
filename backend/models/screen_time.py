from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional


class ScreenTimeCreate(BaseModel):
    screen_name: str
    started_at: datetime
    ended_at: datetime
    duration_seconds: Optional[float] = Field(None, ge=0)


class ScreenTime(ScreenTimeCreate):
    id: str
    player_id: str
    created_at: datetime

    class Config:
        from_attributes = True
