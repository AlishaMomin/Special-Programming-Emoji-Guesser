import { useState } from 'react'
import { WARMUP_QUESTIONS, LABEL_OPTIONS } from '../data/warmUpQuestions'
import './WarmUpPage.css'

export default function WarmUpPage({ onComplete, questions = WARMUP_QUESTIONS, playerName }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedLabel, setSelectedLabel] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)

  const question = questions[questionIndex]
  const isLastQuestion = questionIndex === questions.length - 1

  const handleSubmit = () => {
    if (selectedLabel && !revealed) {
      setRevealed(true)
      if (selectedLabel === question.correctLabel) {
        setScore((s) => s + 1)
      }
      setAnswered(true)
    }
  }

  const handleNextOrFinish = () => {
    if (!revealed) {
      handleSubmit()
      return
    }
    if (isLastQuestion) {
      onComplete(score)
      return
    }
    setQuestionIndex((i) => i + 1)
    setSelectedLabel(null)
    setRevealed(false)
    setAnswered(false)
  }

  const correctOnThis = revealed && selectedLabel === question.correctLabel

  return (
    <div className="warmup-page">
      <div className="warmup-card">
        <div className="warmup-progress">
          <span className="warmup-progress-text">
            {playerName ? `${playerName}'s turn — ` : ''}Round {question.round} of {questions.length}
            <span className="warmup-difficulty"> — {question.difficulty}</span>
          </span>
          <div className="warmup-progress-bar">
            <div className="warmup-progress-fill" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <div className="warmup-row">
          <div className="warmup-story-cell">
            {!revealed ? (
              <p className="warmup-narrative-text">{question.narrative}</p>
            ) : (
              <div className="warmup-reasoning-compact" role="status">
                <p className="reasoning-title">How it works:</p>
                <p className="reasoning-line"><span className="reasoning-emoji">{question.emoji1}</span> → {question.mood1}</p>
                <p className="reasoning-line"><span className="reasoning-emoji">{question.emoji2}</span> → {question.mood2}</p>
                <p className="reasoning-line reasoning-conclusion">{question.reasoning}</p>
                {correctOnThis ? (
                  <p className="reasoning-feedback reasoning-feedback--correct">✓ You got it!</p>
                ) : (
                  <p className="reasoning-feedback reasoning-feedback--wrong">Correct: <strong>{question.correctLabel}</strong></p>
                )}
              </div>
            )}
          </div>

          <div className="warmup-play-cell">
            <div className="warmup-emojis">
              <span className="warmup-emoji-circle" aria-hidden="true">{question.emoji1}</span>
              <span className="warmup-emoji-circle" aria-hidden="true">{question.emoji2}</span>
            </div>
            <p className="warmup-question">What do you think the overall label should be?</p>
            <div className="warmup-options">
              {LABEL_OPTIONS.map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`warmup-option ${selectedLabel === label ? 'warmup-option--selected' : ''} ${revealed ? (label === question.correctLabel ? 'warmup-option--correct' : selectedLabel === label ? 'warmup-option--wrong' : '') : ''}`}
                  onClick={() => !revealed && setSelectedLabel(label)}
                  disabled={revealed}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="warmup-actions">
              <button
                type="button"
                className="warmup-next-button"
                disabled={!selectedLabel && !revealed}
                onClick={handleNextOrFinish}
              >
                {!revealed ? 'Check answer' : isLastQuestion ? 'Finish warm-up' : 'Next round'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
