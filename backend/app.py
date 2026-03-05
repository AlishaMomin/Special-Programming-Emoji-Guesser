"""
Emoji Guesser – Flask REST API.
Database: Firebase (not connected yet). Uses in-memory store for development.
"""
from flask import Flask
from flask_cors import CORS

from config import Config
from routes.games import games_bp
from routes.players import players_bp
from routes.starter_round import starter_round_bp
from routes.main_game import main_game_bp
from routes.screen_times import screen_times_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    CORS(app)

    app.register_blueprint(games_bp, url_prefix="/api/games")
    app.register_blueprint(players_bp, url_prefix="/api/players")
    app.register_blueprint(starter_round_bp, url_prefix="/api/players")
    app.register_blueprint(main_game_bp, url_prefix="/api/players")
    app.register_blueprint(screen_times_bp, url_prefix="/api/players")

    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=app.config.get("DEBUG", True), port=5000)
