import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initConsoleLogger } from "@/lib/consoleLogger";
import { initPWARecovery } from "@/lib/pwaRecovery";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import App from "./App.tsx";

initConsoleLogger();
initPWARecovery();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
