/**
 * Titles for each round of the main game.
 */
export const ROUND_TITLES = {
  1: 'Data & Features',
  2: 'Pattern Recognition',
  3: 'Classification',
}

/**
 * Player 1: 6 narratives (one per question). Story-based, educational, engaging.
 */
export const MAIN_GAME_NARRATIVES_P1 = [
  "You've been picked to test a new AI that reads mood from emojis. Nobody's shown you how it works yet — that's the fun part. Send it up to 5 emojis (your call). Then guess: will it say Positive, Neutral, or Negative? Lock in your guess first. The answer stays hidden until you do.",
  "Second try. Same AI, new emojis. Here's the thing: every emoji you pick is a piece of data the AI uses. Change the input, and the result can change too. Pick another set, make another guess. We'll show you how it decided after.",
  "New round. The AI isn't just looking at one emoji — it's looking at your whole combination. Does the mix lean happy, sad, or in between? That's the pattern it's after. Send another mood in emojis. Can you guess the pattern before we reveal it?",
  "One more in this round. Mix it up: all positive, all negative, or a blend. The AI will count and compare. Pick your emojis, make your guess. Then we'll show you exactly what it saw.",
  "Final round. You've seen how your emojis become data, and how the AI spots patterns. Now it does one last step: it picks a single label. Positive, Neutral, or Negative — one box. Send your emojis. What box do you think it'll choose?",
  "Last question. You've got this. Same drill: your emojis, your guess, then the full reveal — including how the AI added everything up and chose its answer. Make your call.",
]

/**
 * Player 2: Different story, same structure. 6 narratives.
 */
export const MAIN_GAME_NARRATIVES_P2 = [
  "Your turn. There's an AI that labels mood from emojis — and you're here to crack how it works. Send up to 5 emojis. Guess: Positive, Neutral, or Negative? The machine won't show its cards until you lock in.",
  "Another round. Every emoji you choose is data. Swap one, and the result can flip. Pick a new set, make your guess. We'll reveal how it decided once you're in.",
  "This round the AI looks at the whole picture — not one emoji, but the mix. What pattern do you think it sees? Send your emojis, then guess. The reveal comes after.",
  "Mix it up again. All good vibes, all rough, or a bit of both. The AI will weigh them. Your move: pick emojis, guess the label. Then we'll show you what it did.",
  "Final round. You know the drill by now: data first, then patterns, then one label. Positive, Neutral, or Negative. Send your emojis. Which box will it pick?",
  "Last one. Your emojis, your guess, then the full breakdown — how the AI added everything and chose. Make your call.",
]

/** Backward compat: default to P1 */
export const MAIN_GAME_NARRATIVES = MAIN_GAME_NARRATIVES_P1

export const MAIN_GAME_NARRATIVES_SETS = [MAIN_GAME_NARRATIVES_P1, MAIN_GAME_NARRATIVES_P2]
