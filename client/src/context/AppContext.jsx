import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("rps-theme") || "dark");
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem("rps-sound") !== "off");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("rps-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("rps-sound", soundEnabled ? "on" : "off");
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
