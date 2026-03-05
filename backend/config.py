"""
App configuration. Firebase connection (credentials, project) can be added here later.
"""
import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY") or "emoji-guesser-dev-secret"
    # Firebase not connected yet; add FIREBASE_CREDENTIALS_PATH, etc. when ready.
    DEBUG = os.environ.get("FLASK_DEBUG", "1") == "1"
