import "dotenv/config";
import next from "next";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerRoomHandlers, roomCount, startRoomCleanup } from "./server/src/rooms.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || (dev ? "http://localhost:3000" : "*");

async function main() {
  await app.prepare();
  const server = express();

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

  server.all("*", (req, res) => handle(req, res));

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
