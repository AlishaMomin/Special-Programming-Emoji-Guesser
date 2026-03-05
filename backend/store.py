"""
In-memory store for development. Replace with Firebase (Firestore) when connecting.
All data is lost on restart. Structure matches README.md collections.
"""
import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional

# games: id -> document
games: Dict[str, Dict[str, Any]] = {}
# players: id -> document
players: Dict[str, Dict[str, Any]] = {}
# player_ids by game_id for quick lookup
players_by_game: Dict[str, List[str]] = {}
# starter_round_answers: list of documents (filter by player_id in routes)
starter_round_answers: List[Dict[str, Any]] = []
# screen_times: list of documents
screen_times: List[Dict[str, Any]] = []
# main_game_answers: list of documents
main_game_answers: List[Dict[str, Any]] = []


def _now() -> str:
    return datetime.utcnow().isoformat() + "Z"


def game_create(status: str = "in_progress") -> Dict[str, Any]:
    gid = str(uuid.uuid4())
    now = _now()
    doc = {"id": gid, "created_at": now, "updated_at": now, "status": status}
    games[gid] = doc
    players_by_game[gid] = []
    return doc


def game_get(gid: str) -> Optional[Dict[str, Any]]:
    return games.get(gid)


def player_create(game_id: str, player_number: int, name: str, age: int, avatar: str) -> Dict[str, Any]:
    if game_id not in games:
        raise ValueError("Game not found")
    pid = str(uuid.uuid4())
    now = _now()
    doc = {
        "id": pid,
        "game_id": game_id,
        "player_number": player_number,
        "name": name,
        "age": age,
        "avatar": avatar,
        "starter_score": 0,
        "main_score": 0,
        "created_at": now,
        "updated_at": now,
    }
    players[pid] = doc
    players_by_game[game_id].append(pid)
    return doc


def player_get(pid: str) -> Optional[Dict[str, Any]]:
    return players.get(pid)


def player_update(pid: str, **kwargs: Any) -> Optional[Dict[str, Any]]:
    doc = players.get(pid)
    if not doc:
        return None
    allowed = {"name", "age", "avatar", "starter_score", "main_score"}
    for k, v in kwargs.items():
        if k in allowed and v is not None:
            doc[k] = v
    doc["updated_at"] = _now()
    return doc


def players_by_game_id(game_id: str) -> List[Dict[str, Any]]:
    pids = players_by_game.get(game_id, [])
    return [players[pid] for pid in pids if pid in players]


def starter_answer_create(player_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    aid = str(uuid.uuid4())
    doc = {
        "id": aid,
        "player_id": player_id,
        "created_at": _now(),
        **data,
    }
    starter_round_answers.append(doc)
    return doc


def starter_answers_by_player(player_id: str) -> List[Dict[str, Any]]:
    return [a for a in starter_round_answers if a["player_id"] == player_id]


def screen_time_create(player_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    sid = str(uuid.uuid4())
    doc = {
        "id": sid,
        "player_id": player_id,
        "created_at": _now(),
        **data,
    }
    screen_times.append(doc)
    return doc


def screen_times_by_player(player_id: str) -> List[Dict[str, Any]]:
    return [s for s in screen_times if s["player_id"] == player_id]


def main_game_answer_create(player_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
    mid = str(uuid.uuid4())
    doc = {
        "id": mid,
        "player_id": player_id,
        "created_at": _now(),
        **data,
    }
    main_game_answers.append(doc)
    return doc


def main_game_answers_by_player(player_id: str) -> List[Dict[str, Any]]:
    return [a for a in main_game_answers if a["player_id"] == player_id]
