# Neon RPS Arena

A production-ready two-player multiplayer Rock Paper Scissors app built with React 19, Vite, Express, and Socket.IO. Rooms are stored in memory and inactive rooms are cleaned up automatically.

## Features

- Create and join private two-player rooms
- Secure random room IDs and player IDs
- Hidden player choices with simultaneous reveal
- Unlimited rounds with wins, losses, draws, win percentage, and streaks
- Round history with timestamps
- Owner controls: restart, reset score, kick player, close room
- Owner disconnect closes the room and notifies the other player
- Room chat with typing indicator, timestamps, emoji-compatible text, and auto-scroll
- Dark/light themes saved in LocalStorage
- Sound toggle, win confetti, online status, connection notifications
- Responsive gaming UI for desktop, tablet, mobile, portrait, and landscape
- Input validation and text sanitization on the server

## Project Structure

```text
rock-paper-scissors/
├── client/
│   ├── public/
│   │   ├── arena-bg.png
│   │   ├── favicon.svg
│   │   └── manifest.webmanifest
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── index.js
│   │   ├── rooms.js
│   │   └── utils.js
│   ├── .env.example
│   └── package.json
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## Local Setup

```bash
cd rock-paper-scissors
npm install
npm run install:all
```

Create environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Start both apps:

```bash
npm run dev
```

Default URLs:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
- Health check: `http://localhost:5000/health`

## Environment Variables

### Client

```text
VITE_SERVER_URL=http://localhost:5000
```

For Vercel, set `VITE_SERVER_URL` to the deployed Render backend URL.

### Server

```text
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
ROOM_TTL_MINUTES=45
```

For Render, set `CLIENT_ORIGIN` to the deployed Vercel frontend URL.

## Scripts

Root:

```bash
npm run install:all
npm run dev
npm run build
npm start
```

Client:

```bash
npm run dev
npm run build
npm run preview
```

Server:

```bash
npm run dev
npm start
```

## Deploy Frontend To Vercel

1. Push this repository to GitHub.
2. Create a new Vercel project.
3. Set the root directory to `client`.
4. Set build command to `npm run build`.
5. Set output directory to `dist`.
6. Add environment variable:

```text
VITE_SERVER_URL=https://your-render-service.onrender.com
```

7. Deploy.

## Deploy Backend To Render

1. Create a new Render Web Service.
2. Connect the same GitHub repository.
3. Set root directory to `server`.
4. Set build command:

```bash
npm install
```

5. Set start command:

```bash
npm start
```

6. Add environment variables:

```text
CLIENT_ORIGIN=https://your-vercel-app.vercel.app
ROOM_TTL_MINUTES=45
```

Render supplies `PORT` automatically.

## Socket.IO Events

The server implements:

- `create-room`
- `join-room`
- `leave-room`
- `player-ready`
- `player-choice`
- `round-result`
- `restart`
- `reset-score`
- `close-room`
- `chat-message`
- `typing`
- `disconnect`

## Notes

- Room data is in memory, so restarting the backend clears active rooms.
- The backend accepts one configured frontend origin through `CLIENT_ORIGIN`.
- Generated project artwork is stored at `client/public/arena-bg.png`.
