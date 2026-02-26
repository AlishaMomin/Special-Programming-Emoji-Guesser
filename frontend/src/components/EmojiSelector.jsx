import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react'
import { MAX_EMOJI_SELECT, getEmojiData } from '../data/emojiPool'
import './EmojiSelector.css'

export default function EmojiSelector({ selected, onSelect }) {
  const [pickerOpen, setPickerOpen] = useState(false)

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji
    const { weight, moodLabel } = getEmojiData(emoji)
    if (selected.length < MAX_EMOJI_SELECT) {
      onSelect([...selected, { emoji, weight, moodLabel }])
    }
  }

  const removeEmoji = (index) => {
    onSelect(selected.filter((_, i) => i !== index))
  }

  return (
    <div className="emoji-selector">
      <p className="emoji-selector-hint">Pick up to {MAX_EMOJI_SELECT} emojis to represent a mood. Click the button below to open the picker.</p>
      <div className="emoji-selector-trigger-wrap">
        <button
          type="button"
          className="emoji-selector-trigger"
          onClick={() => setPickerOpen((o) => !o)}
          aria-expanded={pickerOpen}
        >
          {pickerOpen ? 'Close picker' : '📂 Select emojis'}
        </button>
      </div>
      {pickerOpen && (
        <div className="emoji-selector-picker">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme="dark"
            width="100%"
            height={360}
          />
        </div>
      )}
      {selected.length > 0 && (
        <div className="emoji-selector-chips">
          <p className="emoji-selector-chips-label">Your selection (click to remove):</p>
          <div className="emoji-selector-chips-list">
            {selected.map((s, i) => (
              <button
                key={`${s.emoji}-${i}`}
                type="button"
                className="emoji-selector-chip"
                onClick={() => removeEmoji(i)}
                aria-label={`Remove ${s.emoji}`}
              >
                {s.emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      <p className="emoji-selector-count">
        {selected.length} / {MAX_EMOJI_SELECT} selected
      </p>
    </div>
  )
}
