/**
 * Emojis available in the main game selector.
 * weight: positive = positive mood, negative = negative mood, 0 = neutral.
 * moodLabel: short label for reasoning (e.g. "Happy", "Sad").
 */
export const EMOJI_POOL = [
  { emoji: '😀', weight: 2, moodLabel: 'Happy' },
  { emoji: '😊', weight: 1, moodLabel: 'Happy' },
  { emoji: '❤️', weight: 2, moodLabel: 'Love' },
  { emoji: '🎉', weight: 2, moodLabel: 'Celebration' },
  { emoji: '🔥', weight: 1, moodLabel: 'Hype' },
  { emoji: '🤗', weight: 1, moodLabel: 'Warm' },
  { emoji: '🦊', weight: 1, moodLabel: 'Cute' },
  { emoji: '🐶', weight: 1, moodLabel: 'Cute' },
  { emoji: '⭐', weight: 1, moodLabel: 'Good' },
  { emoji: '😌', weight: 1, moodLabel: 'Relieved' },
  { emoji: '🌈', weight: 1, moodLabel: 'Hope' },
  { emoji: '😐', weight: 0, moodLabel: 'Neutral' },
  { emoji: '🤔', weight: 0, moodLabel: 'Thinking' },
  { emoji: '😶', weight: 0, moodLabel: 'Neutral' },
  { emoji: '😢', weight: -1, moodLabel: 'Sad' },
  { emoji: '💔', weight: -2, moodLabel: 'Heartbreak' },
  { emoji: '😤', weight: -1, moodLabel: 'Frustrated' },
  { emoji: '😰', weight: -1, moodLabel: 'Anxious' },
  { emoji: '💀', weight: -1, moodLabel: 'Rough' },
  { emoji: '😡', weight: -2, moodLabel: 'Angry' },
  { emoji: '😓', weight: -1, moodLabel: 'Stressed' },
  { emoji: '🙄', weight: -1, moodLabel: 'Annoyed' },
]

export const MAX_EMOJI_SELECT = 5

export const LABELS = ['Positive', 'Neutral', 'Negative']

/** Sum weights and map to label */
export function weightToLabel(total) {
  if (total > 0) return 'Positive'
  if (total < 0) return 'Negative'
  return 'Neutral'
}

const EMOJI_MAP = new Map(EMOJI_POOL.map((e) => [e.emoji, { weight: e.weight, moodLabel: e.moodLabel }]))

/** Get weight and moodLabel for any emoji; unknown emojis default to neutral. */
export function getEmojiData(emoji) {
  const data = EMOJI_MAP.get(emoji)
  return data ?? { weight: 0, moodLabel: 'Neutral' }
}
