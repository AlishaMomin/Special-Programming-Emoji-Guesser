import { useState } from 'react'
import WelcomePage from './pages/WelcomePage'

export default function App() {
  const [player, setPlayer] = useState(null)

  const handleStartGame = (profile) => {
    setPlayer(profile)
    // TODO: Navigate to game (warm-up then rounds)
  }

  return (
    <>
      {!player ? (
        <WelcomePage onStartGame={handleStartGame} />
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Hello, {player.name}! Your character: {player.avatar?.emoji} — game screens coming next.</p>
        </div>
      )}
    </>
  )
}
