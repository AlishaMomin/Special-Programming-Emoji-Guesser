import './TurnIntroPage.css'

export default function TurnIntroPage({ player, playerLabel, onBegin }) {
  return (
    <div className="turn-intro">
      <div className="turn-intro-card">
        <p className="turn-intro-label">{playerLabel}</p>
        <div className="turn-intro-avatar">
          {player?.avatar?.emoji ?? '?'}
        </div>
        <h2 className="turn-intro-name">{player?.name ?? 'Player'}</h2>
        <p className="turn-intro-message">Complete the warm-up, then the main game. The other player will go after you.</p>
        <button type="button" className="turn-intro-button" onClick={onBegin}>
          Begin
        </button>
      </div>
    </div>
  )
}
