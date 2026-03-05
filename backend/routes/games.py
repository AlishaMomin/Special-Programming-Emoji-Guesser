"""
Game and leaderboard routes.
- POST /api/games – create game (optionally with two players in body)
- GET /api/games/<game_id> – get game
- GET /api/games/<game_id>/players – list players
- GET /api/games/<game_id>/leaderboard – leaderboard (both players with scores)
"""
from flask import Blueprint, request, jsonify

from store import (
    game_create,
    game_get,
    player_create,
    players_by_game_id,
)

games_bp = Blueprint("games", __name__)


@games_bp.route("", methods=["POST"])
def create_game():
    """
    Create a new game. Body can be empty or include both players:
    { "player1": { "name", "age", "avatar" }, "player2": { "name", "age", "avatar" } }
    """
    game = game_create()
    payload = request.get_json(silent=True) or {}
    player1_data = payload.get("player1")
    player2_data = payload.get("player2")

    if player1_data and player2_data:
        p1 = player_create(
            game_id=game["id"],
            player_number=1,
            name=player1_data.get("name", "Player 1"),
            age=player1_data.get("age", 13),
            avatar=player1_data.get("avatar", ""),
        )
        p2 = player_create(
            game_id=game["id"],
            player_number=2,
            name=player2_data.get("name", "Player 2"),
            age=player2_data.get("age", 13),
            avatar=player2_data.get("avatar", ""),
        )
        return jsonify({"game": game, "player1": p1, "player2": p2}), 201
    return jsonify({"game": game}), 201


@games_bp.route("/<game_id>", methods=["GET"])
def get_game(game_id):
    game = game_get(game_id)
    if not game:
        return jsonify({"error": "Game not found"}), 404
    return jsonify(game)


@games_bp.route("/<game_id>/players", methods=["GET"])
def list_players(game_id):
    if not game_get(game_id):
        return jsonify({"error": "Game not found"}), 404
    plist = players_by_game_id(game_id)
    return jsonify({"players": plist})


@games_bp.route("/<game_id>/leaderboard", methods=["GET"])
def get_leaderboard(game_id):
    """
    Leaderboard for this game: both players with starter_score and main_score.
    """
    if not game_get(game_id):
        return jsonify({"error": "Game not found"}), 404
    plist = players_by_game_id(game_id)
    leaderboard = [
        {
            "player_id": p["id"],
            "player_number": p["player_number"],
            "name": p["name"],
            "avatar": p["avatar"],
            "starter_score": p["starter_score"],
            "main_score": p["main_score"],
        }
        for p in plist
    ]
    return jsonify({"leaderboard": leaderboard})
