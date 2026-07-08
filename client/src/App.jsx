import { Landing } from "./components/Landing.jsx";
import { WaitingRoom } from "./components/WaitingRoom.jsx";
import { GameRoom } from "./components/GameRoom.jsx";
import { TopBar } from "./components/TopBar.jsx";
import { useSocketGame } from "./hooks/useSocketGame.js";

export default function App() {
  const game = useSocketGame();

  return (
    <div className="app-shell">
      <TopBar connection={game.connection} />
      {game.notice && (
        <div className="toast" role="status">
          <span>{game.notice}</span>
          <button type="button" onClick={() => game.setNotice("")} aria-label="Dismiss notification">
            x
          </button>
        </div>
      )}
      <main className="main-grid">
        {game.view === "landing" && <Landing game={game} />}
        {game.view === "waiting" && game.room && <WaitingRoom game={game} />}
        {game.view === "game" && game.room && <GameRoom game={game} />}
        {game.view !== "landing" && !game.room && <Landing game={game} />}
      </main>
    </div>
  );
}
