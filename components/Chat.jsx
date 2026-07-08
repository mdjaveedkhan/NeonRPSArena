import { useEffect, useRef, useState } from "react";

export function Chat({ room, playerId, sendChat, setTyping, typingPlayer }) {
  const [message, setMessage] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [room.chat]);

  function submit(event) {
    event.preventDefault();
    if (!message.trim()) return;
    sendChat(message);
    setMessage("");
    setTyping(false);
  }

  return (
    <section className="glass-panel chat-panel" aria-label="Room chat">
      <h2>Chat</h2>
      <div className="messages" role="log" aria-live="polite">
        {room.chat.map((item) => (
          <div key={item.id} className={`message ${item.playerId === playerId ? "mine" : ""}`}>
            <strong>{item.playerName}</strong>
            <p>{item.message}</p>
            <small>{new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</small>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <p className="typing-line">{typingPlayer ? `${typingPlayer} is typing...` : " "}</p>
      <form className="chat-form" onSubmit={submit}>
        <input
          type="text"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setTyping(Boolean(event.target.value));
          }}
          onBlur={() => setTyping(false)}
          placeholder="Message your opponent"
          maxLength="220"
          aria-label="Chat message"
        />
        <button type="submit" className="primary-button">
          Send
        </button>
      </form>
    </section>
  );
}
