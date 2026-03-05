"""
Main game answers.
- POST /api/players/<player_id>/main-game-answers – submit one or many answers
- GET /api/players/<player_id>/main-game-answers – get all main game answers for player
"""
from flask import Blueprint, request, jsonify

from models.main_game import MainGameAnswerCreate
from store import main_game_answer_create, main_game_answers_by_player, player_get

main_game_bp = Blueprint("main_game", __name__)


@main_game_bp.route("/<player_id>/main-game-answers", methods=["POST"])
def submit_main_game_answers(player_id):
    if not player_get(player_id):
        return jsonify({"error": "Player not found"}), 404
    body = request.get_json(silent=True)
    if not body:
        return jsonify({"error": "JSON body required"}), 400

    items = body if isinstance(body, list) else [body]
    created = []
    for item in items:
        try:
            payload = MainGameAnswerCreate(**item)
        except Exception as e:
            return jsonify({"error": str(e)}), 400
        data = payload.model_dump()
        doc = main_game_answer_create(player_id, data)
        created.append(doc)
    return jsonify({"answers": created}), 201


@main_game_bp.route("/<player_id>/main-game-answers", methods=["GET"])
def get_main_game_answers(player_id):
    if not player_get(player_id):
        return jsonify({"error": "Player not found"}), 404
    answers = main_game_answers_by_player(player_id)
    return jsonify({"answers": answers})
