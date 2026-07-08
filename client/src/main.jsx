import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./context/AppContext.jsx";
import "./styles.css";

const App = lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <Suspense fallback={<div className="app-shell loading-screen">Loading arena...</div>}>
      <App />
    </Suspense>
  </AppProvider>
);
