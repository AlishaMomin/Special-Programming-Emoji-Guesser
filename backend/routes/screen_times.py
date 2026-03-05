"""
Screen time recording (time spent on each screen per player).
- POST /api/players/<player_id>/screen-times – record one or many screen times
- GET /api/players/<player_id>/screen-times – get all screen times for player
"""
from flask import Blueprint, request, jsonify

from models.screen_time import ScreenTimeCreate
from store import screen_time_create, screen_times_by_player, player_get

screen_times_bp = Blueprint("screen_times", __name__)


@screen_times_bp.route("/<player_id>/screen-times", methods=["POST"])
def record_screen_times(player_id):
    if not player_get(player_id):
        return jsonify({"error": "Player not found"}), 404
    body = request.get_json(silent=True)
    if not body:
        return jsonify({"error": "JSON body required"}), 400

    items = body if isinstance(body, list) else [body]
    created = []
    for item in items:
        try:
            payload = ScreenTimeCreate(**item)
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        data = payload.model_dump()
        doc = screen_time_create(player_id, data)
        created.append(doc)
    return jsonify({"screen_times": created}), 201


@screen_times_bp.route("/<player_id>/screen-times", methods=["GET"])
def get_screen_times(player_id):
    if not player_get(player_id):
        return jsonify({"error": "Player not found"}), 404
    times = screen_times_by_player(player_id)
    return jsonify({"screen_times": times})
