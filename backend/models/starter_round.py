from datetime import datetime
from pydantic import BaseModel, Field
from typing import Literal

Label = Literal["Positive", "Neutral", "Negative"]


class StarterRoundAnswerCreate(BaseModel):
    question_set: int = Field(..., ge=1, le=2)
    question_index: int = Field(..., ge=0, le=4)
    emoji_1: str
    emoji_2: str
    correct_label: Label
    player_answer: Label
    is_correct: bool
    time_spent_seconds: float = Field(..., ge=0)


class StarterRoundAnswer(StarterRoundAnswerCreate):
    id: str
    player_id: str
    created_at: datetime

    class Config:
        from_attributes = True
