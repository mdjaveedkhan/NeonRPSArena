import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => typeof window !== 'undefined' ? localStorage.getItem("rps-theme") || "dark" : "dark");
  const [soundEnabled, setSoundEnabled] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem("rps-sound") !== "off" : true));

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("rps-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try { localStorage.setItem("rps-sound", soundEnabled ? "on" : "off"); } catch {}
  }, [soundEnabled]);

  const value = useMemo(
    () => ({
      theme,
      soundEnabled,
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      toggleSound: () => setSoundEnabled((current) => !current)
    }),
    [theme, soundEnabled]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
