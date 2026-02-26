import { weightToLabel } from './emojiPool'

/**
 * Compute AI prediction from selected emojis (each has .emoji, .weight, .moodLabel).
 */
export function computePrediction(selected) {
  if (!selected || selected.length === 0) return { label: 'Neutral', total: 0, breakdown: [] }
  const total = selected.reduce((sum, s) => sum + s.weight, 0)
  const label = weightToLabel(total)
  const breakdown = selected.map((s) => ({ emoji: s.emoji, weight: s.weight, moodLabel: s.moodLabel }))
  return { label, total, breakdown }
}

/**
 * Level 1: Data & Features
 */
export function getReasoningLevel1(breakdown) {
  const lines = breakdown.map((b) => `${b.emoji} → ${b.moodLabel} (${b.weight >= 0 ? '+' : ''}${b.weight})`)
  return {
    title: 'Data & Features',
    takeaway: 'Changing the input changes the output.',
    bullets: [
      'Your emojis are the data.',
      'Each emoji adds information the AI uses.',
      ...lines,
    ],
  }
}

/**
 * Level 2: Pattern Recognition
 */
export function getReasoningLevel2(breakdown, label) {
  const pos = breakdown.filter((b) => b.weight > 0).length
  const neg = breakdown.filter((b) => b.weight < 0).length
  const neut = breakdown.filter((b) => b.weight === 0).length
  let pattern = 'mixed'
  if (pos > neg && pos > neut) pattern = 'more positive'
  else if (neg > pos && neg > neut) pattern = 'more negative'
  else if (neut >= pos && neut >= neg) pattern = 'mostly neutral or mixed'
  return {
    title: 'Pattern Recognition',
    takeaway: 'AI can detect patterns from groups of data.',
    bullets: [
      'AI checks how many emojis are positive vs negative.',
      `You chose ${pos} positive, ${neg} negative, ${neut} neutral.`,
      `Pattern suggests the mood may lean ${pattern}.`,
    ],
  }
}

/**
 * Level 3: Classification
 */
export function getReasoningLevel3(breakdown, total, label) {
  const formula = breakdown.map((b) => `${b.emoji} (${b.weight >= 0 ? '+' : ''}${b.weight})`).join(' + ')
  const range = total > 0 ? 'positive' : total < 0 ? 'negative' : 'neutral'
  return {
    title: 'Classification',
    takeaway: 'AI assigns a label (class) based on computed evidence.',
    bullets: [
      'Classification means placing your input into one category.',
      `${formula} = Total (${total >= 0 ? '+' : ''}${total})`,
      `Total is in the ${range} range → ${label}`,
    ],
  }
}

export function getReasoningForLevel(level, prediction) {
  const { breakdown, total, label } = prediction
  if (level === 1) return getReasoningLevel1(breakdown)
  if (level === 2) return getReasoningLevel2(breakdown, label)
  return getReasoningLevel3(breakdown, total, label)
}

/**
 * Encouraging feedback comparing student guess to AI prediction.
 */
export function getComparisonFeedback(studentGuess, aiLabel) {
  if (studentGuess === aiLabel) {
    return "You and the AI agreed — nice job reading the mood!"
  }
  const pairs = [
    ['Positive', 'Neutral'],
    ['Positive', 'Negative'],
    ['Neutral', 'Positive'],
    ['Neutral', 'Negative'],
    ['Negative', 'Neutral'],
    ['Negative', 'Positive'],
  ]
  const isAdjacent = pairs.some(([a, b]) => (a === studentGuess && b === aiLabel) || (a === aiLabel && b === studentGuess))
  if (isAdjacent) {
    return "Your guess was close! The emojis had mixed signals — the AI combined them slightly differently."
  }
  return "Different take! The AI weighed the emojis and got a different label. That’s why transparency matters."
}
