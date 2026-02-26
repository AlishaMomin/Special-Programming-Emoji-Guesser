import { useState } from 'react'
import WelcomePage from './pages/WelcomePage'
import GameLayout from './components/GameLayout'
import TurnIntroPage from './pages/TurnIntroPage'
import WarmUpPage from './pages/WarmUpPage'
import WarmUpComplete from './pages/WarmUpComplete'
import MainGamePage from './pages/MainGamePage'
import FinalScoresPage from './pages/FinalScoresPage'
import { WARMUP_QUESTIONS_SET_1, WARMUP_QUESTIONS_SET_2 } from './data/warmUpQuestions'
import { MAIN_GAME_NARRATIVES_SETS } from './data/mainGameNarratives'

const STORY = {
  turnIntro: "It's this player's turn. They'll play the full game (warm-up + main game), then the other player goes.",
  warmup: "First, let's learn how labels work. Each question has two emojis — what's the overall mood?",
  warmupComplete: "You've got the idea! Labels come from combining signals. Now you're ready for the main game.",
  mainGame: "Pick up to 5 emojis, see how the AI reasons, then guess the mood. Each round teaches a new idea.",
  finalScores: "Game complete! Here are both players' scores.",
}

export default function App() {
  const [players, setPlayers] = useState(null)
  const [phase, setPhase] = useState('welcome')
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [warmUpScores, setWarmUpScores] = useState([undefined, undefined])
  const [mainRoundScores, setMainRoundScores] = useState([undefined, undefined])

  const handleStartGame = (playersArray) => {
    setPlayers(playersArray)
    setCurrentPlayer(0)
    setWarmUpScores([undefined, undefined])
    setMainRoundScores([undefined, undefined])
    setPhase('turn-intro')
  }

  const handleTurnIntroBegin = () => {
    setPhase('warmup')
  }

  const handleWarmUpComplete = (score) => {
    setWarmUpScores((prev) => {
      const next = [...prev]
      next[currentPlayer] = score
      return next
    })
    setPhase('warmup-complete')
  }

  const handleContinueToMain = () => {
    setPhase('main-game')
  }

  const handleMainScoresUpdate = ({ mainRoundCorrect }) => {
    setMainRoundScores((prev) => {
      const next = [...prev]
      next[currentPlayer] = mainRoundCorrect
      return next
    })
  }

  const handleMainGameComplete = ({ mainRoundCorrect }) => {
    setMainRoundScores((prev) => {
      const next = [...prev]
      next[currentPlayer] = mainRoundCorrect
      return next
    })
    if (currentPlayer === 0) {
      setCurrentPlayer(1)
      setPhase('turn-intro')
    } else {
      setPhase('final-scores')
    }
  }

  if (!players) {
    return <WelcomePage onStartGame={handleStartGame} />
  }

  const storyText =
    phase === 'turn-intro' ? STORY.turnIntro :
    phase === 'warmup' ? STORY.warmup :
    phase === 'warmup-complete' ? STORY.warmupComplete :
    phase === 'main-game' ? STORY.mainGame :
    phase === 'final-scores' ? STORY.finalScores :
    STORY.warmup

  const currentPlayerData = players[currentPlayer]
  const warmUpQuestionsSets = [WARMUP_QUESTIONS_SET_1, WARMUP_QUESTIONS_SET_2]

  return (
    <GameLayout
      players={players}
      currentPlayer={phase === 'final-scores' ? null : currentPlayer}
      storyText={storyText}
      warmUpScores={warmUpScores}
      mainRoundScores={mainRoundScores}
    >
      {phase === 'turn-intro' && (
        <TurnIntroPage
          player={currentPlayerData}
          playerLabel={currentPlayer === 0 ? "Player 1's turn" : "Player 2's turn"}
          onBegin={handleTurnIntroBegin}
        />
      )}
      {phase === 'warmup' && (
        <WarmUpPage
          questions={warmUpQuestionsSets[currentPlayer]}
          playerName={currentPlayerData?.name}
          onComplete={handleWarmUpComplete}
        />
      )}
      {phase === 'warmup-complete' && (
        <WarmUpComplete
          score={warmUpScores[currentPlayer]}
          onContinue={handleContinueToMain}
        />
      )}
      {phase === 'main-game' && (
        <MainGamePage
          playerName={currentPlayerData?.name}
          narratives={MAIN_GAME_NARRATIVES_SETS[currentPlayer]}
          onComplete={handleMainGameComplete}
          onScoresUpdate={handleMainScoresUpdate}
        />
      )}
      {phase === 'final-scores' && (
        <FinalScoresPage
          players={players}
          warmUpScores={warmUpScores}
          mainRoundScores={mainRoundScores}
        />
      )}
    </GameLayout>
  )
}
