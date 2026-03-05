"""
Pydantic models for request/response and document shape.
Maps to the 5 tables (Firebase collections) described in README.md.
"""
from .game import Game, GameCreate
from .player import Player, PlayerCreate, PlayerUpdate
from .starter_round import StarterRoundAnswer, StarterRoundAnswerCreate
from .screen_time import ScreenTime, ScreenTimeCreate
from .main_game import MainGameAnswer, MainGameAnswerCreate

__all__ = [
    "Game",
    "GameCreate",
    "Player",
    "PlayerCreate",
    "PlayerUpdate",
    "StarterRoundAnswer",
    "StarterRoundAnswerCreate",
    "ScreenTime",
    "ScreenTimeCreate",
    "MainGameAnswer",
    "MainGameAnswerCreate",
]
