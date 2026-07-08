// Import `next` only when running the full Next app. For backend-only
// deployments (e.g., Render) set `SKIP_NEXT=true` to avoid requiring
// the `next` package at runtime.
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerRoomHandlers, roomCount, startRoomCleanup } from "./server/src/rooms.js";

const dev = process.env.NODE_ENV !== "production";
let handle = null;
let app = null;
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || (dev ? "http://localhost:3000" : "*");

async function main() {
  // Load dotenv only in development if available. This avoids a hard
  // dependency on `dotenv` in production environments (Render provides
  // env vars) and prevents deployment failures when `dotenv` isn't installed.
  if (dev) {
    try {
      await import('dotenv/config');
    } catch (err) {
      // Ignore: dotenv may not be installed in production/build images.
      console.warn('dotenv not loaded (package missing) — proceeding with process.env');
    }
  }
  const server = express();

  // If SKIP_NEXT is not set, dynamically import Next and prepare it.
  if (process.env.SKIP_NEXT !== "true") {
    try {
      const nextModule = await import('next');
      app = nextModule.default({ dev });
      handle = app.getRequestHandler();
      await app.prepare();
    } catch (err) {
      console.warn('Next.js not initialized — continuing in backend-only mode');
    }
  }

  // During development Next's react-refresh/runtime uses eval which violates
  // strict Content Security Policies. Disable helmet's CSP in dev so the
  // HMR/runtime can work locally. In production we keep helmet defaults.
  if (dev) {
    server.use(helmet({ contentSecurityPolicy: false }));
  } else {
    server.use(helmet());
  }
  server.use(cors({ origin: CLIENT_ORIGIN }));
  server.use(express.json({ limit: "20kb" }));

  server.get("/api", (_req, res) => {
    res.json({ name: "Multiplayer Rock Paper Scissors API", status: "ok", rooms: roomCount() });
  });

  server.get("/health", (_req, res) => {
    res.json({ status: "healthy", rooms: roomCount(), uptime: process.uptime() });
  });

  // Only register the Next request handler when available.
  if (handle) {
    server.all("*", (req, res) => handle(req, res));
  }

  const httpServer = createServer(server);

  const io = new Server(httpServer, {
    cors: {
      origin: CLIENT_ORIGIN,
      methods: ["GET", "POST"]
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000
    }
  });

  io.on("connection", (socket) => {
    registerRoomHandlers(io, socket);
  });

  startRoomCleanup(io);

  httpServer.listen(PORT, () => {
    console.log(`RPS Next.js server listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
