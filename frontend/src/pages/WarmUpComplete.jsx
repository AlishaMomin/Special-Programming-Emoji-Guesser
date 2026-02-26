import './WarmUpComplete.css'

export default function WarmUpComplete({ score, onContinue }) {
  return (
    <div className="warmup-complete">
      <div className="warmup-complete-card">
        <span className="warmup-complete-emoji" aria-hidden="true">🎉</span>
        <h2 className="warmup-complete-title">Warm-up complete!</h2>
        <p className="warmup-complete-score">You got <strong>{score}/5</strong> right.</p>
        <p className="warmup-complete-message">
          You now know how labels work: the overall mood comes from combining each emoji's mood. Ready for the main game?
        </p>
        <button type="button" className="warmup-complete-button" onClick={onContinue}>
          Continue to main game
        </button>
      </div>
    </div>
  )
}
