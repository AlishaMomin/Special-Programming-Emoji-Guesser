import { useState } from 'react'
import EmojiSelector from '../components/EmojiSelector'
import { LABELS } from '../data/emojiPool'
import { ROUND_TITLES } from '../data/mainGameNarratives'
import {
  computePrediction,
  getReasoningForLevel,
  getComparisonFeedback,
} from '../data/mainGameLogic'
import './MainGamePage.css'

const TOTAL_ROUNDS = 3
const QUESTIONS_PER_ROUND = 2

export default function MainGamePage({
  playerName,
  narratives,
  onComplete,
  onScoresUpdate,
}) {
  const [round, setRound] = useState(1)
  const [question, setQuestion] = useState(1)
  const [step, setStep] = useState('select') // 'select' | 'guess' | 'reveal'
  const [selected, setSelected] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [studentGuess, setStudentGuess] = useState(null)
  const [roundResults, setRoundResults] = useState([])

  const level = round
  const reasoning = prediction ? getReasoningForLevel(level, prediction) : null
  const narrativeIndex = (round - 1) * QUESTIONS_PER_ROUND + (question - 1)
  const narrative = narratives?.[narrativeIndex]
  const roundTitle = ROUND_TITLES[round]

  const handleContinueFromSelect = () => {
    if (selected.length === 0) return
    setPrediction(computePrediction(selected))
    setStep('guess')
  }

  const handleSubmitGuess = () => {
    if (!studentGuess || !prediction) return
    const result = {
      studentGuess,
      aiLabel: prediction.label,
      match: studentGuess === prediction.label,
    }
    setRoundResults((prev) => {
      const next = [...prev, result]
      onScoresUpdate?.({
        mainRoundCorrect: next.filter((r) => r.match).length,
        aiMatches: next.filter((r) => r.match).length,
      })
      return next
    })
    setStep('reveal')
  }

  const handleNext = () => {
    if (question < QUESTIONS_PER_ROUND) {
      setQuestion((q) => q + 1)
      setStep('select')
      setSelected([])
      setPrediction(null)
      setStudentGuess(null)
      return
    }
    if (round < TOTAL_ROUNDS) {
      setRound((r) => r + 1)
      setQuestion(1)
      setStep('select')
      setSelected([])
      setPrediction(null)
      setStudentGuess(null)
      return
    }
    const totalCorrect = roundResults.filter((r) => r.match).length
    onComplete({ mainRoundCorrect: totalCorrect, aiMatches: totalCorrect })
  }

  const nextButtonLabel = question < QUESTIONS_PER_ROUND ? 'Next question' : round < TOTAL_ROUNDS ? 'Next round' : 'Finish game'

  const feedbackText = prediction && studentGuess ? getComparisonFeedback(studentGuess, prediction.label) : ''

  return (
    <div className="main-game-page">
      <div className="main-game-card">
        <div className="main-game-progress">
          <span className="main-game-progress-text">
            {playerName ? `${playerName}'s turn — ` : ''}Round {round} of {TOTAL_ROUNDS}: {roundTitle}
          </span>
          <span className="main-game-progress-subtext">
            Question {question} of {QUESTIONS_PER_ROUND}
          </span>
          <div className="main-game-progress-bar">
            <div
              className="main-game-progress-fill"
              style={{
                width: `${((round - 1) * QUESTIONS_PER_ROUND + question) / (TOTAL_ROUNDS * QUESTIONS_PER_ROUND) * 100}%`,
              }}
            />
          </div>
        </div>

        {narrative && (
          <div className="main-game-narrative">
            <p className="main-game-narrative-text">{narrative}</p>
          </div>
        )}

        {step === 'select' && (
          <>
            <EmojiSelector selected={selected} onSelect={setSelected} />
            {selected.length > 0 && (
              <div className="main-game-selected">
                <p className="main-game-selected-label">Your selection:</p>
                <div className="main-game-selected-chips">
                  {selected.map((s, i) => (
                    <span key={i} className="main-game-chip">{s.emoji}</span>
                  ))}
                </div>
              </div>
            )}
            <div className="main-game-actions">
              <button
                type="button"
                className="main-game-btn main-game-btn--primary"
                disabled={selected.length === 0}
                onClick={handleContinueFromSelect}
              >
                Lock in and guess the label
              </button>
            </div>
          </>
        )}

        {step === 'guess' && (
          <>
            <div className="main-game-selected main-game-selected--compact">
              <p className="main-game-selected-label">Your emojis:</p>
              <div className="main-game-selected-chips">
                {selected.map((s, i) => (
                  <span key={i} className="main-game-chip">{s.emoji}</span>
                ))}
              </div>
            </div>
            <p className="main-game-question">What do you think the overall label will be?</p>
            <div className="main-game-options">
              {LABELS.map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`main-game-option ${studentGuess === label ? 'main-game-option--selected' : ''}`}
                  onClick={() => setStudentGuess(label)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="main-game-actions">
              <button
                type="button"
                className="main-game-btn main-game-btn--primary"
                disabled={!studentGuess}
                onClick={handleSubmitGuess}
              >
                Reveal AI prediction & how it thought
              </button>
            </div>
          </>
        )}

        {step === 'reveal' && prediction && reasoning && (
          <div className="main-game-reveal">
            <p className="main-game-reveal-heading">Result</p>
            <div className="main-game-reveal-comparison">
              <div className="main-game-reveal-card main-game-reveal-card--you">
                <span className="main-game-reveal-card-label">Your guess</span>
                <span className="main-game-reveal-card-value">{studentGuess}</span>
              </div>
              <div className="main-game-reveal-card main-game-reveal-card--ai">
                <span className="main-game-reveal-card-label">AI prediction</span>
                <span className="main-game-reveal-card-value">{prediction.label}</span>
              </div>
            </div>
            <p className="main-game-reveal-feedback">{feedbackText}</p>
            <section className="main-game-reasoning-block" aria-label="How the AI reasoned">
              <h3 className="main-game-reasoning-block-title">Level {level}: {reasoning.title}</h3>
              <ul className="main-game-reasoning-block-list">
                {reasoning.bullets.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p className="main-game-reasoning-block-takeaway">{reasoning.takeaway}</p>
            </section>
            <div className="main-game-actions">
              <button type="button" className="main-game-btn main-game-btn--primary" onClick={handleNext}>
                {nextButtonLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
