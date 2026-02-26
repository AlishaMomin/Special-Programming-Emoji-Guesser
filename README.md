# Emoji Guesser

An interactive learning game for 8th graders that teaches how AI makes decisions using emotional data. Students use emojis as inputs and learn how AI goes from **raw input → reasoning → classification**.

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Python Flask _(planned)_
- **Database:** TBD, easy to deploy _(planned)_
- **Deployment:** Full stack _(planned)_

---

## How to Run the Project

### Prerequisites

- **Node.js** 18 or newer ([download](https://nodejs.org/))
- **npm** (comes with Node.js)

To check versions:

```bash
node -v   # e.g. v18.x or v20.x
npm -v
```

### 1. Clone the repository

```bash
git clone https://github.com/AlishaMomin/Special-Programming-Emoji-Guesser.git
cd Special-Programming-Emoji-Guesser
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Run the frontend (development)

```bash
npm run dev
```

Then open the URL shown in the terminal (usually **http://localhost:5173**) in your browser.

### 4. Build for production (optional)

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## Project structure

```
Special-Programming-Emoji-Guesser/
├── frontend/           # React (Vite) app
│   ├── src/
│   │   ├── pages/      # Page components (e.g. WelcomePage)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
└── (backend/ and other folders will be added later)
```

---

## Frontend (current)

- **Page 1 – Welcome:** Student enters name, age, and selects an avatar/character. A **Play Game** button appears once all fields are filled. This is the starting screen for the Emoji Guesser experience.

More pages (warm-up activity, main game rounds, feedback) will be added as the project grows.

---

## License

See [LICENSE](LICENSE) in this repository.
