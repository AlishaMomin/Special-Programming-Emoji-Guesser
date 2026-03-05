"""
Starter (warm-up) round answers.
- POST /api/players/<player_id>/starter-answers – submit one or many answers
- GET /api/players/<player_id>/starter-answers – get all starter answers for player
"""
from flask import Blueprint, request, jsonify

from models.starter_round import StarterRoundAnswerCreate
from store import starter_answer_create, starter_answers_by_player, player_get

starter_round_bp = Blueprint("starter_round", __name__)


@starter_round_bp.route("/<player_id>/starter-answers", methods=["POST"])
def submit_starter_answers(player_id):
    if not player_get(player_id):
        return jsonify({"error": "Player not found"}), 404
    body = request.get_json(silent=True)
    if not body:
        return jsonify({"error": "JSON body required"}), 400

    # Allow single object or list
    items = body if isinstance(body, list) else [body]
    created = []
    for item in items:
        try:
            payload = StarterRoundAnswerCreate(**item)
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        data = payload.model_dump()
        doc = starter_answer_create(player_id, data)
        created.append(doc)
    return jsonify({"answers": created}), 201


@starter_round_bp.route("/<player_id>/starter-answers", methods=["GET"])
def get_starter_answers(player_id):
    if not player_get(player_id):
        return jsonify({"error": "Player not found"}), 404
    answers = starter_answers_by_player(player_id)
    return jsonify({"answers": answers})
