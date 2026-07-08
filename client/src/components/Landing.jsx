import { useMemo, useState } from "react";

function getInitialRoom() {
  return new URLSearchParams(window.location.search).get("room") || "";
}

export function Landing({ game }) {
  const initialRoom = getInitialRoom();
  const [mode, setMode] = useState(initialRoom ? "join" : "create");
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState(initialRoom);
  const inviteRoom = useMemo(() => roomId.trim().toUpperCase(), [roomId]);

  async function submit(event) {
    event.preventDefault();
    if (mode === "create") {
      await game.createRoom(playerName);
    } else {
      await game.joinRoom(inviteRoom, playerName);
    }
  }

  return (
    <section className="landing-layout fade-in">
      <div className="hero-panel">
        <p className="eyebrow">Real-time private rooms</p>
        <h1>Neon RPS Arena</h1>
        <p className="hero-copy">
          Create a two-player room, share the code, chat live, and battle through unlimited hidden-choice
          rounds with full score tracking.
        </p>
        <div className="mode-tabs" role="tablist" aria-label="Room action">
          <button
            type="button"
            className={mode === "create" ? "active" : ""}
            onClick={() => setMode("create")}
            role="tab"
            aria-selected={mode === "create"}
          >
            Create Room
          </button>
          <button
            type="button"
            className={mode === "join" ? "active" : ""}
            onClick={() => setMode("join")}
            role="tab"
            aria-selected={mode === "join"}
          >
            Join Room
          </button>
        </div>
        <form className="glass-panel form-panel" onSubmit={submit}>
          <label>
            Player Name
            <input
              type="text"
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              placeholder="Your arena name"
              minLength="2"
              maxLength="28"
              required
            />
          </label>
          {mode === "join" && (
            <label>
              Room ID
              <input
                type="text"
                value={roomId}
                onChange={(event) => setRoomId(event.target.value.toUpperCase())}
                placeholder="AB3K92"
                minLength="6"
                maxLength="6"
                required
              />
            </label>
          )}
          <button type="submit" className="primary-button ripple">
            {mode === "create" ? "Create Room" : "Join Room"}
          </button>
        </form>
      </div>

      <aside className="rules-panel glass-panel" aria-labelledby="rules-title">
        <h2 id="rules-title">Rules</h2>
        <ul>
          <li>Rock crushes scissors.</li>
          <li>Paper covers rock.</li>
          <li>Scissors cut paper.</li>
          <li>Choices reveal only after both players lock in.</li>
          <li>The owner can restart, reset scores, kick a player, or close the room.</li>
        </ul>
      </aside>
    </section>
  );
}
