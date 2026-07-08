export function initials(name = "?") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function PlayerCard({ player, label, emptyText = "Waiting..." }) {
  if (!player) {
    return (
      <article className="player-card empty">
        <span>{label}</span>
        <div className="avatar">?</div>
        <strong>{emptyText}</strong>
        <small>Invite a challenger</small>
      </article>
    );
  }

  return (
    <article className={`player-card ${player.hasChosen ? "chosen" : ""}`}>
      <span>{label}</span>
      <div className="avatar">{initials(player.name)}</div>
      <strong>{player.name}</strong>
      <small>{player.isOwner ? "Owner" : "Challenger"}</small>
      <small className={player.isOnline ? "online-text" : "offline-text"}>
        {player.isOnline ? "Online" : "Offline"}
      </small>
    </article>
  );
}
