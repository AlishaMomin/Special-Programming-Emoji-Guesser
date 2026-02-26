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

export default function WelcomePage({ onStartGame }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)

  const isComplete = name.trim().length > 0 && age.trim().length > 0 && avatar !== null
  const ageNum = parseInt(age, 10)
  const ageValid = !isNaN(ageNum) && ageNum >= 1 && ageNum <= 120
  const selectedAvatarData = avatar ? AVATARS.find((a) => a.id === avatar) : null

  const handleSelectAvatar = (id) => {
    setAvatar(id)
    setShowAvatarPicker(false)
  }

  const handlePlay = () => {
    if (!isComplete || !ageValid) return
    onStartGame({ name: name.trim(), age: ageNum, avatar: selectedAvatarData })
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-header">
          <h1 className="welcome-title">
            <span className="title-emoji">😀</span> Emoji Guesser
          </h1>
          <p className="welcome-subtitle">Learn how AI labels emotions — pick your profile and play!</p>
        </div>

        <div className="welcome-form">
          {/* 1. Avatar / Character first */}
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
              onClick={() => setShowAvatarPicker((open) => !open)}
              aria-expanded={showAvatarPicker}
              aria-haspopup="dialog"
            >
              {selectedAvatarData ? `Change character (${selectedAvatarData.label})` : 'Select your avatar'}
            </button>
            {showAvatarPicker && (
              <div className="avatar-picker-dropdown" role="dialog" aria-label="Choose your character">
                <p className="avatar-picker-hint">Click one to be your character in the game.</p>
                <div className="avatar-grid">
                  {AVATARS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      className={`avatar-option ${avatar === a.id ? 'avatar-option--selected' : ''}`}
                      onClick={() => handleSelectAvatar(a.id)}
                      aria-pressed={avatar === a.id}
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

          {/* 2. Name */}
          <label className="input-label">Your name</label>
          <input
            type="text"
            className="welcome-input"
            placeholder="e.g. Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            autoComplete="name"
          />

          {/* 3. Age */}
          <label className="input-label">Your age</label>
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
          {age.trim() && !ageValid && (
            <p className="input-hint">Please enter an age between 1 and 120.</p>
          )}

          {/* 4. Start Game */}
          <div className="welcome-actions">
            <button
              type="button"
              className="play-button"
              disabled={!isComplete || !ageValid}
              onClick={handlePlay}
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
