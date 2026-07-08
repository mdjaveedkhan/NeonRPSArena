import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createServer } from "http";
import { Server } from "socket.io";
import { registerRoomHandlers, roomCount, startRoomCleanup } from "./rooms.js";

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const app = express();
const server = createServer(app);

app.use(helmet());
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json({ limit: "20kb" }));

app.get("/", (_request, response) => {
  response.json({
    name: "Multiplayer Rock Paper Scissors API",
    status: "ok",
    rooms: roomCount()
  });
});

app.get("/health", (_request, response) => {
  response.json({ status: "healthy", rooms: roomCount(), uptime: process.uptime() });
});

const io = new Server(server, {
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

server.listen(PORT, () => {
  console.log(`RPS server listening on port ${PORT}`);
});
