const stats = [
  ["wins", "Wins"],
  ["losses", "Losses"],
  ["draws", "Draws"],
  ["roundsPlayed", "Rounds"],
  ["winPercentage", "Win %"],
  ["currentStreak", "Streak"],
  ["longestStreak", "Best"]
];

export function Scoreboard({ players }) {
  return (
    <section className="scoreboard" aria-label="Scoreboard">
      {players.map((player) => (
        <article key={player.id} className="glass-panel score-card">
          <h3>{player.name}</h3>
          <div className="stat-grid">
            {stats.map(([key, label]) => (
              <div key={key}>
                <span>{label}</span>
                <strong>{player.stats?.[key] ?? 0}</strong>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
