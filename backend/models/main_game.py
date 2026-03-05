from datetime import datetime
from pydantic import BaseModel, Field
from typing import Literal, List

Label = Literal["Positive", "Neutral", "Negative"]


class MainGameAnswerCreate(BaseModel):
    round_number: int = Field(..., ge=1, le=2)
    question_index: int = Field(..., ge=0, le=1)
    emojis_selected: List[str]
    player_guess: Label
    ai_label: Label
    is_correct: bool
    time_spent_seconds: float = Field(..., ge=0)


class MainGameAnswer(MainGameAnswerCreate):
    id: str
    player_id: str
    created_at: datetime

    class Config:
        from_attributes = True
