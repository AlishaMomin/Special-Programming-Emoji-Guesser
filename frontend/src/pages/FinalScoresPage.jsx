import './FinalScoresPage.css'

export default function FinalScoresPage({ players, warmUpScores, mainRoundScores }) {
  const p1 = players?.[0]
  const p2 = players?.[1]

  return (
    <div className="final-scores">
      <div className="final-scores-card">
        <h2 className="final-scores-title">Final scores</h2>
        <p className="final-scores-subtitle">Both players have completed the game.</p>
        <div className="final-scores-grid">
          <div className="final-scores-player">
            <span className="final-scores-avatar">{p1?.avatar?.emoji}</span>
            <span className="final-scores-name">{p1?.name ?? 'Player 1'}</span>
            <div className="final-scores-row">
              <span>Starter round</span>
              <strong>{warmUpScores?.[0] ?? 0}/5</strong>
            </div>
            <div className="final-scores-row">
              <span>Main game</span>
              <strong>{mainRoundScores?.[0] ?? 0}/6</strong>
            </div>
          </div>
          <div className="final-scores-player">
            <span className="final-scores-avatar">{p2?.avatar?.emoji}</span>
            <span className="final-scores-name">{p2?.name ?? 'Player 2'}</span>
            <div className="final-scores-row">
              <span>Starter round</span>
              <strong>{warmUpScores?.[1] ?? 0}/5</strong>
            </div>
            <div className="final-scores-row">
              <span>Main game</span>
              <strong>{mainRoundScores?.[1] ?? 0}/6</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
