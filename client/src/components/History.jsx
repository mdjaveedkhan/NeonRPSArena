export function History({ history, playerId }) {
  return (
    <section className="glass-panel history-panel" aria-label="Game history">
      <h2>History</h2>
      <div className="history-list">
        {history.length === 0 && <p className="muted">No rounds yet.</p>}
        {history.map((round) => {
          const mine = round.players.find((player) => player.id === playerId);
          const opponent = round.players.find((player) => player.id !== playerId);
          return (
            <article key={`${round.round}-${round.timestamp}`} className={`history-row ${mine?.result}`}>
              <strong>Round {round.round}</strong>
              <span>
                You: {mine?.choice} | Opponent: {opponent?.choice}
              </span>
              <small>
                {mine?.result === "draw" ? "Draw" : mine?.result === "win" ? "You won" : "You lost"} at{" "}
                {new Date(round.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </small>
            </article>
          );
        })}
      </div>
    </section>
  );
}
