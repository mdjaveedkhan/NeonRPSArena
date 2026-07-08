import { Chat } from "./Chat.jsx";
import { History } from "./History.jsx";
import { PlayerCard } from "./PlayerCard.jsx";
import { Scoreboard } from "./Scoreboard.jsx";

const choices = [
  { id: "rock", label: "Rock", icon: "R" },
  { id: "paper", label: "Paper", icon: "P" },
  { id: "scissors", label: "Scissors", icon: "S" }
];

export function GameRoom({ game }) {
  const { room, playerId, lastResult } = game;
  if (!room) {
    return (
      <section className="room-layout fade-in">
        <div className="glass-panel room-panel">
          <p className="eyebrow">Room unavailable</p>
          <h1>Back to Lobby</h1>
          <p className="hero-copy">The room is no longer active. Create a new room or join with a fresh invite link.</p>
          <button type="button" className="ghost-button" onClick={() => game.setView("landing")}>
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  const players = room?.players || [];
  const me = players.find((player) => player.id === playerId);
  const opponent = players.find((player) => player.id !== playerId);
  const isOwner = room.ownerId === playerId;
  const revealMine = lastResult?.players.find((player) => player.id === playerId);
  const revealOpponent = lastResult?.players.find((player) => player.id !== playerId);
  const resultState = revealMine?.result || "";
  const resultTitle =
    resultState === "win" ? "Victory Rush" : resultState === "loss" ? "Power Down" : resultState === "draw" ? "Standoff" : "";
  const resultLine =
    resultState === "win"
      ? "You crushed this round."
      : resultState === "loss"
        ? "Take a breath. The comeback arc starts now."
        : resultState === "draw"
          ? "Same move. Same energy."
          : "";

  if (!me) {
    return (
      <section className="room-layout fade-in">
        <div className="glass-panel room-panel">
          <p className="eyebrow">Syncing</p>
          <h1>Rejoining Room</h1>
          <p className="hero-copy">Your browser is reconnecting to the room. If this stays here, create a fresh room and join again.</p>
          <button type="button" className="ghost-button" onClick={game.leave}>
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="game-layout fade-in">
      <div className="arena-column">
        <div className={`glass-panel arena-panel ${resultState ? `arena-${resultState}` : ""}`}>
          <div className="arena-header">
            <div>
              <p className="eyebrow">Room {room.id}</p>
              <h1>Round {room.round}</h1>
            </div>
            <div className="button-row compact">
              {isOwner && (
                <>
                  <button type="button" className="ghost-button" onClick={game.restart}>
                    Restart
                  </button>
                  <button type="button" className="ghost-button" onClick={game.resetScore}>
                    Reset Score
                  </button>
                </>
              )}
              <button type="button" className="ghost-button" onClick={game.leave}>
                Leave
              </button>
            </div>
          </div>

          <div className="duel-grid">
            <PlayerCard player={me} label="You" />
            <div className="versus">VS</div>
            <div className="opponent-wrap">
              <PlayerCard player={opponent} label="Opponent" emptyText="Waiting..." />
              {isOwner && opponent && (
                <button type="button" className="danger-button small" onClick={() => game.kickPlayer(opponent.id)}>
                  Kick
                </button>
              )}
            </div>
          </div>

          <div className="choice-grid" aria-label="Choose rock, paper, or scissors">
            {choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className="choice-button"
                onClick={() => game.choose(choice.id)}
                disabled={me?.hasChosen}
                aria-label={`Choose ${choice.label}`}
              >
                <span>{choice.icon}</span>
                {choice.label}
              </button>
            ))}
          </div>

          <div className="reveal-panel">
            <div>
              <span>Your choice</span>
              <strong>{revealMine?.choice || (me?.hasChosen ? "Locked" : "Waiting")}</strong>
            </div>
            <div>
              <span>Opponent choice</span>
              <strong>{revealOpponent?.choice || (opponent?.hasChosen ? "Locked" : "Waiting")}</strong>
            </div>
            <div className={`result-badge ${revealMine?.result || ""}`}>
              {revealMine ? (revealMine.result === "draw" ? "Draw" : revealMine.result === "win" ? "You win" : "You lose") : "Choose"}
            </div>
          </div>

          {resultState && (
            <div className={`result-animation ${resultState}`} role="status" aria-live="polite">
              <div className="anime-burst" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="anime-face" aria-hidden="true">
                <span className="eye left-eye" />
                <span className="eye right-eye" />
                <span className="mouth" />
                {resultState === "loss" && (
                  <>
                    <span className="tear left-tear" />
                    <span className="tear right-tear" />
                  </>
                )}
              </div>
              <div>
                <strong>{resultTitle}</strong>
                <p>{resultLine}</p>
              </div>
            </div>
          )}
        </div>
        <Scoreboard players={players} />
      </div>

      <aside className="side-column">
        <Chat
          room={room}
          playerId={playerId}
          sendChat={game.sendChat}
          setTyping={game.setTyping}
          typingPlayer={game.typingPlayer}
        />
        <History history={room.history} playerId={playerId} />
      </aside>
    </section>
  );
}
