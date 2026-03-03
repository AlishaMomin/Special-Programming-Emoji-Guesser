import { useState } from 'react'
import './GameLayout.css'

export default function GameLayout({ players, currentPlayer, storyText, warmUpScores, mainRoundScores, children }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const p1 = players?.[0]
  const p2 = players?.[1]

  return (
    <div className="game-layout">
      <header className="game-header">
        <div className="game-header-left">
          <span className="game-logo">😀 Emoji Guesser</span>
          <div className="game-header-players">
            <div className={`player-badge ${currentPlayer === 0 ? 'player-badge--active' : ''}`}>
              <span className="player-avatar" aria-hidden="true">{p1?.avatar?.emoji ?? '?'}</span>
              <span className="player-name">{p1?.name ?? 'Player 1'}</span>
            </div>
            <div className={`player-badge ${currentPlayer === 1 ? 'player-badge--active' : ''}`}>
              <span className="player-avatar" aria-hidden="true">{p2?.avatar?.emoji ?? '?'}</span>
              <span className="player-name">{p2?.name ?? 'Player 2'}</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="leaderboard-button"
          onClick={() => setShowLeaderboard(true)}
          aria-label="Open leaderboard"
        >
          🏆 Leaderboard
        </button>
      </header>

      <div className="story-strip" role="complementary" aria-label="Story">
        <p className="story-text">{storyText}</p>
      </div>

      <main className="game-main">
        {children}
      </main>

      {showLeaderboard && (
        <div className="leaderboard-overlay" onClick={() => setShowLeaderboard(false)}>
          <div className="leaderboard-modal" onClick={(e) => e.stopPropagation()}>
            <div className="leaderboard-header">
              <h2>🏆 Leaderboard</h2>
              <button type="button" className="leaderboard-close" onClick={() => setShowLeaderboard(false)} aria-label="Close">×</button>
            </div>
            <div className="leaderboard-content">
              <p className="leaderboard-hint">Starter round (warm-up) and Main game scores for both players.</p>
              <ul className="leaderboard-list">
                <li className="leaderboard-item leaderboard-item--you">
                  <span className="rank">1</span>
                  <span className="lb-avatar">{p1?.avatar?.emoji}</span>
                  <span className="lb-name">{p1?.name ?? 'Player 1'}</span>
                  <span className="lb-score">Starter: {warmUpScores?.[0] ?? 0}/5 · Main: {mainRoundScores?.[0] ?? 0}/4</span>
                </li>
                <li className="leaderboard-item leaderboard-item--you">
                  <span className="rank">2</span>
                  <span className="lb-avatar">{p2?.avatar?.emoji}</span>
                  <span className="lb-name">{p2?.name ?? 'Player 2'}</span>
                  <span className="lb-score">Starter: {warmUpScores?.[1] ?? 0}/5 · Main: {mainRoundScores?.[1] ?? 0}/4</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
