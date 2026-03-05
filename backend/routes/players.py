"""
Player routes.
- GET /api/players/<player_id> – get player
- PATCH /api/players/<player_id> – update player (e.g. starter_score, main_score)
"""
from flask import Blueprint, request, jsonify

from models.player import PlayerUpdate
from store import player_get, player_update

players_bp = Blueprint("players", __name__)


@players_bp.route("/<player_id>", methods=["GET"])
def get_player(player_id):
    player = player_get(player_id)
    if not player:
        return jsonify({"error": "Player not found"}), 404
    return jsonify(player)


@players_bp.route("/<player_id>", methods=["PATCH"])
def update_player(player_id):
    player = player_get(player_id)
    if not player:
        return jsonify({"error": "Player not found"}), 404
    body = request.get_json(silent=True) or {}
    try:
        update = PlayerUpdate(**body)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    updated = player_update(
        player_id,
        name=update.name,
        age=update.age,
        avatar=update.avatar,
        starter_score=update.starter_score,
        main_score=update.main_score,
    )
    return jsonify(updated)
