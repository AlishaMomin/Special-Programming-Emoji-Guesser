# Emoji Guesser – Backend (Flask + REST API)

Python Flask REST API for the Emoji Guesser game. Database is planned to be **Firebase**; no Firebase connection is implemented yet. This document describes the data model (tables/collections and columns/fields) and the API.

---

## Data Model (Tables / Collections)

We use **5 logical tables**. In Firebase these will map to **5 collections** (documents with the fields below).

---

### 1. `games`

One document per game session (both players play in one game).

| Column (Field) | Type     | Description |
|----------------|----------|-------------|
| `id`           | string   | Unique game ID (Firebase document ID or generated UUID). |
| `created_at`   | datetime | When the game was created (ISO 8601). |
| `updated_at`   | datetime | Last update (ISO 8601). |
| `status`       | string   | Optional: `in_progress`, `completed`. |

---

### 2. `players`

One document per player. Each game has exactly two players.

| Column (Field)   | Type    | Description |
|------------------|---------|-------------|
| `id`             | string  | Unique player ID. |
| `game_id`        | string  | Reference to `games.id`. |
| `player_number`  | int     | `1` or `2`. |
| `name`           | string  | Player display name. |
| `age`            | int     | Player age. |
| `avatar`         | string  | Avatar identifier or URL. |
| `starter_score`  | int     | Warm-up score: 0–5 (correct answers in starter round). |
| `main_score`     | int     | Main game score: 0–4 (correct answers in main game). |
| `created_at`     | datetime| When the player was created. |
| `updated_at`     | datetime| Last update. |

---

### 3. `starter_round_answers`

One document per warm-up (starter) question answered. Each player has 5 starter questions.

| Column (Field)     | Type    | Description |
|--------------------|---------|-------------|
| `id`               | string  | Unique answer ID. |
| `player_id`        | string  | Reference to `players.id`. |
| `question_set`     | int     | `1` (Player 1) or `2` (Player 2). |
| `question_index`   | int     | Index of question in set: 0–4. |
| `emoji_1`          | string  | First emoji shown (e.g. `"❤️"`). |
| `emoji_2`          | string  | Second emoji shown (e.g. `"💔"`). |
| `correct_label`    | string  | Correct label: `Positive`, `Neutral`, or `Negative`. |
| `player_answer`    | string  | What the player chose: `Positive`, `Neutral`, or `Negative`. |
| `is_correct`       | bool    | Whether `player_answer` matches `correct_label`. |
| `time_spent_seconds` | float | Time spent on this question screen (seconds). |
| `created_at`       | datetime| When the answer was recorded. |

---

### 4. `screen_times`

One document per screen view (time spent on a single screen). Used for analytics per player.

| Column (Field)     | Type    | Description |
|--------------------|---------|-------------|
| `id`               | string  | Unique record ID. |
| `player_id`        | string  | Reference to `players.id`. |
| `screen_name`      | string  | Identifier for the screen (see list below). |
| `started_at`       | datetime| When the player entered the screen (ISO 8601). |
| `ended_at`         | datetime| When the player left the screen (ISO 8601). |
| `duration_seconds` | float   | Optional; can be computed as `ended_at - started_at`. |
| `created_at`       | datetime| When the record was created. |

**Suggested `screen_name` values:**

- `welcome` – Welcome page (both players).
- `turn_intro_p1` / `turn_intro_p2` – Turn intro for Player 1 or 2.
- `warmup_question_0` … `warmup_question_4` – Each warm-up question (0–4).
- `warmup_complete` – After warm-up, before main game.
- `main_round_1_question_0`, `main_round_1_question_1` – Pattern Recognition (round 1).
- `main_round_2_question_0`, `main_round_2_question_1` – Classification (round 2).
- `final_scores` – Final scores / leaderboard screen.

---

### 5. `main_game_answers`

One document per main-game question answered. Each player has 4 main-game questions (2 rounds × 2 questions).

| Column (Field)       | Type    | Description |
|----------------------|---------|-------------|
| `id`                 | string  | Unique answer ID. |
| `player_id`          | string  | Reference to `players.id`. |
| `round_number`       | int     | Main game round: `1` (Pattern Recognition) or `2` (Classification). |
| `question_index`     | int     | Question within round: `0` or `1`. |
| `emojis_selected`    | array   | List of emoji strings (e.g. `["😊", "😢", "😐"]`). |
| `player_guess`       | string  | Player’s guess: `Positive`, `Neutral`, or `Negative`. |
| `ai_label`           | string  | AI’s label: `Positive`, `Neutral`, or `Negative`. |
| `is_correct`         | bool    | Whether `player_guess` matches `ai_label`. |
| `time_spent_seconds` | float   | Time spent on this question (seconds). |
| `created_at`         | datetime| When the answer was recorded. |

---

## Leaderboard

There is **no separate leaderboard table**. Leaderboard data is derived from `players`:

- For a given `game_id`, fetch both players and return `player_number`, `name`, `avatar`, `starter_score`, `main_score`, and optionally a computed rank or total.

---

## Summary: Table Count

| # | Table (Collection)     | Purpose |
|---|------------------------|---------|
| 1 | `games`                | One game session. |
| 2 | `players`              | Two players per game; name, age, avatar, starter/main scores. |
| 3 | `starter_round_answers`| Each player’s 5 warm-up Q&A + time per question. |
| 4 | `screen_times`         | Time spent on each screen per player. |
| 5 | `main_game_answers`    | Each player’s 4 main-game Q&A + time per question. |

**Total: 5 tables (collections).**

---

## API Overview

- **Games:** create game, get game, create both players with game.
- **Players:** get player(s), update player (e.g. scores).
- **Starter round:** submit/get starter round answers per player.
- **Main game:** submit/get main game answers per player.
- **Screen times:** record/get screen time entries per player.
- **Leaderboard:** GET leaderboard for a game (from players).

Firebase is **not** connected yet; the app uses in-memory storage so all routes work for development. When you add Firebase, replace the in-memory store with Firestore calls using the same document shapes above.

---

## API Endpoints (REST)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check. |
| POST | `/api/games` | Create game. Body (optional): `{ "player1": { name, age, avatar }, "player2": { ... } }`. |
| GET | `/api/games/<game_id>` | Get game. |
| GET | `/api/games/<game_id>/players` | List players for game. |
| GET | `/api/games/<game_id>/leaderboard` | Leaderboard (both players’ starter_score, main_score). |
| GET | `/api/players/<player_id>` | Get player. |
| PATCH | `/api/players/<player_id>` | Update player (name, age, avatar, starter_score, main_score). |
| POST | `/api/players/<player_id>/starter-answers` | Submit one or more warm-up answers (body: object or array). |
| GET | `/api/players/<player_id>/starter-answers` | Get all starter answers for player. |
| POST | `/api/players/<player_id>/main-game-answers` | Submit one or more main-game answers (body: object or array). |
| GET | `/api/players/<player_id>/main-game-answers` | Get all main-game answers for player. |
| POST | `/api/players/<player_id>/screen-times` | Record one or more screen times (body: object or array). |
| GET | `/api/players/<player_id>/screen-times` | Get all screen times for player. |

---

## Running the backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Server runs at `http://127.0.0.1:5000`. Frontend is not connected yet; use Postman or curl to test the API.
