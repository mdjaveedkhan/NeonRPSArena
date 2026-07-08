import { PlayerCard } from "./PlayerCard.jsx";

export function WaitingRoom({ game }) {
  const { room, playerId } = game;
  const inviteLink = `${window.location.origin}?room=${room.id}`;
  const isOwner = room.ownerId === playerId;
  const hasTwoPlayers = room.players.length === 2;
  const everyoneOnline = room.players.every((player) => player.isOnline);
  const statusText = hasTwoPlayers && everyoneOnline ? "Starting..." : hasTwoPlayers ? "Player disconnected" : "Waiting...";

  async function copy(text, label) {
    await navigator.clipboard.writeText(text);
    game.setNotice(`${label} copied.`);
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: "Join my RPS room", text: `Room ID: ${room.id}`, url: inviteLink });
    } else {
      await copy(inviteLink, "Invite link");
    }
  }

  return (
    <section className="room-layout slide-in">
      <div className="glass-panel room-panel">
        <p className="eyebrow">Waiting Room</p>
        <h1>Room {room.id}</h1>
        <div className="id-grid">
          <div>
            <span>Room Owner</span>
            <strong>{room.ownerName}</strong>
          </div>
          <div>
            <span>Your Player ID</span>
            <strong>{playerId}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{statusText}</strong>
          </div>
        </div>
        <div className="button-row">
          <button type="button" className="primary-button" onClick={share}>
            Share
          </button>
          <button type="button" className="ghost-button" onClick={() => copy(room.id, "Room ID")}>
            Copy Room ID
          </button>
          <button type="button" className="ghost-button" onClick={() => copy(inviteLink, "Invite link")}>
            Copy Invite Link
          </button>
        </div>
        <div className="players-grid">
          <PlayerCard player={room.players[0]} label="Player 1" />
          <PlayerCard player={room.players[1]} label="Player 2" emptyText="Open seat" />
        </div>
        <div className="button-row">
          {isOwner && (
            <button type="button" className="danger-button" onClick={game.closeRoom}>
              Close Room
            </button>
          )}
          <button type="button" className="ghost-button" onClick={game.leave}>
            Leave
          </button>
        </div>
      </div>
    </section>
  );
}
