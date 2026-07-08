import { useApp } from "../context/AppContext.jsx";

export function TopBar({ connection }) {
  const { theme, soundEnabled, toggleTheme, toggleSound } = useApp();

  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="Neon RPS Arena home">
        <span className="brand-mark">RPS</span>
        <span>Neon Arena</span>
      </a>
      <nav className="top-actions" aria-label="Application controls">
        <span className={`status-dot ${connection}`} aria-live="polite">
          {connection === "online" ? "Online" : connection === "offline" ? "Offline" : "Connecting"}
        </span>
        <button type="button" className="ghost-button" onClick={toggleSound} aria-pressed={soundEnabled}>
          Sound {soundEnabled ? "On" : "Off"}
        </button>
        <button type="button" className="ghost-button" onClick={toggleTheme} aria-pressed={theme === "light"}>
          {theme === "dark" ? "Light" : "Dark"} Theme
        </button>
      </nav>
    </header>
  );
}
