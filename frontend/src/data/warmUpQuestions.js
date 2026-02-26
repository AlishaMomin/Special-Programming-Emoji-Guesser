/**
 * Warm-up: 5 questions each, easy → hard. Mixed emojis, 8th-grade stories.
 * Set 1 = Player 1, Set 2 = Player 2 (different questions and narratives).
 */

const buildQuestion = (id, round, difficulty, narrative, emoji1, emoji2, mood1, mood2, correctLabel, reasoning) => ({
  id,
  round,
  difficulty,
  narrative,
  emoji1,
  emoji2,
  mood1,
  mood2,
  correctLabel,
  reasoning,
})

export const WARMUP_QUESTIONS_SET_1 = [
  buildQuestion(
    1, 1, 'Easy',
    "Your friend just got their crush to reply with a heart… then found out they got friend-zoned. They sent you these two. One win, one L. What's the overall vibe?",
    '❤️', '💔',
    'Love / Happy (Positive)', 'Heartbreak / Sad (Negative)',
    'Neutral',
    'Heart counts toward Positive. Broken heart counts toward Negative. Together they cancel out → Neutral.',
  ),
  buildQuestion(
    2, 2, 'Easy',
    "Your group chat is buzzing — everyone's hyped about the same thing. Two messages in a row. How would you label the overall mood?",
    '🎉', '🔥',
    'Celebration (Positive)', 'Fire / Hype (Positive)',
    'Positive',
    'Both emojis are Positive. Combined they add up → Positive.',
  ),
  buildQuestion(
    3, 3, 'Medium',
    "Someone's venting about homework being impossible, then just sends a plain 'ok.' One strong reaction, one meh. What's the overall label?",
    '💀', '😐',
    '"I\'m dead" / Over it (Negative)', 'Meh / Neutral',
    'Negative',
    'Skull (rough moment) counts toward Negative. Meh doesn\'t change the balance. Overall → Negative.',
  ),
  buildQuestion(
    4, 4, 'Hard',
    "They were heartbroken about something, then saw a rainbow and felt a bit of hope. Two feelings in one moment. What's the overall label?",
    '💔', '🌈',
    'Heartbreak / Down (Negative)', 'Rainbow / Hope (Positive)',
    'Neutral',
    'Broken heart counts toward Negative. Rainbow counts toward Positive. They cancel out → Neutral.',
  ),
  buildQuestion(
    5, 5, 'Hard',
    "They sent a cute animal pic, then 'I'm literally dead' about something that happened. You know the type. Mixed signals — positive, negative, or in between?",
    '🦊', '💀',
    'Cute / Good (Positive)', '"I\'m dead" / Rough (Negative)',
    'Neutral',
    'Fox (cute/good) counts toward Positive. Skull (rough) counts toward Negative. Combined → Neutral.',
  ),
]

export const WARMUP_QUESTIONS_SET_2 = [
  buildQuestion(
    1, 1, 'Easy',
    "Your sibling aced a test and then broke their phone the same day. They texted you these. High and low. What's the overall mood?",
    '🌟', '😩',
    'Success / Happy (Positive)', 'Frustrated (Negative)',
    'Neutral',
    'Star counts toward Positive. Frustrated counts toward Negative. They cancel out → Neutral.',
  ),
  buildQuestion(
    2, 2, 'Easy',
    "Two friends are planning a surprise party. The chat is nothing but good vibes. How would you label it?",
    '🎂', '💜',
    'Celebration (Positive)', 'Love / Support (Positive)',
    'Positive',
    'Both emojis are Positive. Together they add up → Positive.',
  ),
  buildQuestion(
    3, 3, 'Medium',
    "Someone had a terrible morning, then sent a blank 'idk' kind of reply. One strong feeling, one flat. What's the overall label?",
    '😤', '🤷',
    'Frustrated (Negative)', 'Shrug / Neutral',
    'Negative',
    'Frustrated counts toward Negative. Shrug doesn\'t change the balance. Overall → Negative.',
  ),
  buildQuestion(
    4, 4, 'Hard',
    "They were stressed about tryouts, then made the team. Relief and joy mixed with the earlier worry. One moment, two moods. What's the overall label?",
    '😓', '🏆',
    'Stressed (Negative)', 'Win / Proud (Positive)',
    'Neutral',
    'Stressed counts toward Negative. Trophy counts toward Positive. They cancel out → Neutral.',
  ),
  buildQuestion(
    5, 5, 'Hard',
    "A friend sent something silly, then 'that was embarrassing.' Cringe and laugh in one message. Positive, negative, or somewhere in between?",
    '😂', '😬',
    'Laughing (Positive)', 'Cringe / Oops (Negative)',
    'Neutral',
    'Laugh counts toward Positive. Cringe counts toward Negative. Combined → Neutral.',
  ),
]

/** Backward compat: default to set 1 */
export const WARMUP_QUESTIONS = WARMUP_QUESTIONS_SET_1

export const LABEL_OPTIONS = ['Positive', 'Neutral', 'Negative']
