import { useState } from 'react'
import './WelcomePage.css'

const AVATARS = [
  { id: 'fox', emoji: '🦊', label: 'Fox' },
  { id: 'panda', emoji: '🐼', label: 'Panda' },
  { id: 'unicorn', emoji: '🦄', label: 'Unicorn' },
  { id: 'lion', emoji: '🦁', label: 'Lion' },
  { id: 'frog', emoji: '🐸', label: 'Frog' },
  { id: 'cat', emoji: '🐱', label: 'Cat' },
  { id: 'butterfly', emoji: '🦋', label: 'Butterfly' },
  { id: 'dog', emoji: '🐶', label: 'Dog' },
]

function PlayerForm({ label, name, setName, age, setAge, avatar, setAvatar, showAvatarPicker, setShowAvatarPicker }) {
  const selectedAvatarData = avatar ? AVATARS.find((a) => a.id === avatar) : null
  const ageNum = parseInt(age, 10)
  const ageValid = !age.trim() || (!isNaN(ageNum) && ageNum >= 1 && ageNum <= 120)

  return (
    <div className="welcome-player-block">
      <h3 className="welcome-player-label">{label}</h3>
      <div className="avatar-section">
        <div className={`avatar-circle ${selectedAvatarData ? 'avatar-circle--selected' : ''}`} aria-hidden="true">
          {selectedAvatarData ? (
            <span className="avatar-circle-emoji">{selectedAvatarData.emoji}</span>
          ) : (
            <span className="avatar-circle-empty">?</span>
          )}
        </div>
        <button
          type="button"
          className="select-avatar-button"
          onClick={() => setShowAvatarPicker((o) => !o)}
          aria-expanded={showAvatarPicker}
        >
          {selectedAvatarData ? `Change (${selectedAvatarData.label})` : 'Select avatar'}
        </button>
        {showAvatarPicker && (
          <div className="avatar-picker-dropdown" role="dialog">
            <div className="avatar-grid">
              {AVATARS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className={`avatar-option ${avatar === a.id ? 'avatar-option--selected' : ''}`}
                  onClick={() => { setAvatar(a.id); setShowAvatarPicker(false) }}
                  aria-label={`Select ${a.label}`}
                >
                  <span className="avatar-emoji">{a.emoji}</span>
                  <span className="avatar-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <label className="input-label">Name</label>
      <input
        type="text"
        className="welcome-input"
        placeholder="e.g. Alex"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={50}
        autoComplete="off"
      />
      <label className="input-label">Age</label>
      <input
        type="number"
        className="welcome-input"
        placeholder="e.g. 13"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        min={1}
        max={120}
        autoComplete="off"
      />
      {age.trim() && !ageValid && <p className="input-hint">Age 1–120.</p>}
    </div>
  )
}

export default function WelcomePage({ onStartGame }) {
  const [name1, setName1] = useState('')
  const [age1, setAge1] = useState('')
  const [avatar1, setAvatar1] = useState(null)
  const [showPicker1, setShowPicker1] = useState(false)
  const [name2, setName2] = useState('')
  const [age2, setAge2] = useState('')
  const [avatar2, setAvatar2] = useState(null)
  const [showPicker2, setShowPicker2] = useState(false)

  const ageNum1 = parseInt(age1, 10)
  const ageNum2 = parseInt(age2, 10)
  const valid1 = name1.trim().length > 0 && !isNaN(ageNum1) && ageNum1 >= 1 && ageNum1 <= 120 && avatar1 !== null
  const valid2 = name2.trim().length > 0 && !isNaN(ageNum2) && ageNum2 >= 1 && ageNum2 <= 120 && avatar2 !== null
  const bothComplete = valid1 && valid2

  const handlePlay = () => {
    if (!bothComplete) return
    const p1 = { name: name1.trim(), age: ageNum1, avatar: AVATARS.find((a) => a.id === avatar1) }
    const p2 = { name: name2.trim(), age: ageNum2, avatar: AVATARS.find((a) => a.id === avatar2) }
    onStartGame([p1, p2])
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-header">
          <h1 className="welcome-title">
            <span className="title-emoji">😀</span> Emoji Guesser
          </h1>
          <p className="welcome-subtitle">2 players — learn how AI labels emotions. Set up both profiles, then play!</p>
        </div>

        <div className="welcome-form welcome-form--two-player">
          <PlayerForm
            label="Player 1"
            name={name1}
            setName={setName1}
            age={age1}
            setAge={setAge1}
            avatar={avatar1}
            setAvatar={setAvatar1}
            showAvatarPicker={showPicker1}
            setShowAvatarPicker={setShowPicker1}
          />
          <PlayerForm
            label="Player 2"
            name={name2}
            setName={setName2}
            age={age2}
            setAge={setAge2}
            avatar={avatar2}
            setAvatar={setAvatar2}
            showAvatarPicker={showPicker2}
            setShowAvatarPicker={setShowPicker2}
          />
        </div>

        <div className="welcome-actions">
          <button
            type="button"
            className="play-button"
            disabled={!bothComplete}
            onClick={handlePlay}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}
