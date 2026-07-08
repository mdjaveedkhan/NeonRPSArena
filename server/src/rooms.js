import {
  applyResult,
  calculateRound,
  emptyStats,
  isValidChoice,
  isValidPlayerId,
  isValidRoomId,
  makeId,
  makePlayerId,
  sanitizeText
} from "./utils.js";

const rooms = new Map();
const socketToPlayer = new Map();
const ROOM_TTL_MS = Number(process.env.ROOM_TTL_MINUTES || 45) * 60 * 1000;

function publicPlayer(player) {
  return {
    id: player.id,
    name: player.name,
    isOwner: player.isOwner,
    isOnline: player.isOnline,
    isReady: player.isReady,
    hasChosen: Boolean(player.choice),
    stats: player.stats
  };
}

function publicRoom(room) {
  return {
    id: room.id,
    ownerId: room.ownerId,
    ownerName: room.players.find((player) => player.id === room.ownerId)?.name || "",
    status: room.status,
    round: room.round,
    players: room.players.map(publicPlayer),
    history: room.history,
    chat: room.chat,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt
  };
}

function touch(room) {
  room.updatedAt = Date.now();
}

function emitRoom(io, room) {
  io.to(room.id).emit("room-state", publicRoom(room));
}

function createPlayer({ name, socketId, isOwner = false }) {
  return {
    id: makePlayerId(),
    socketId,
    name,
    isOwner,
    isOnline: true,
    isReady: false,
    choice: null,
    stats: emptyStats()
  };
}

function findPlayer(room, playerId) {
  return room.players.find((player) => player.id === playerId);
}

function closeRoom(io, roomId, reason = "Room closed.") {
  const room = rooms.get(roomId);
  if (!room) return;
  io.to(roomId).emit("room-closed", { reason });
  for (const player of room.players) {
    socketToPlayer.delete(player.socketId);
  }
  rooms.delete(roomId);
  io.in(roomId).socketsLeave(roomId);
}

function startGameIfReady(io, room) {
  if (room.players.length === 2 && room.status !== "playing") {
    room.status = "playing";
    room.round += 1;
    room.players.forEach((player) => {
      player.isReady = true;
      player.choice = null;
    });
    io.to(room.id).emit("game-started", { round: room.round });
  }
}

function resetRoundChoices(room) {
  room.players.forEach((player) => {
    player.choice = null;
  });
}

function handleCompletedRound(io, room) {
  const [first, second] = room.players;
  if (!first?.choice || !second?.choice) return;

  const firstResult = calculateRound(first.choice, second.choice);
  const secondResult = calculateRound(second.choice, first.choice);
  first.stats = applyResult(first.stats, firstResult);
  second.stats = applyResult(second.stats, secondResult);

  const winnerId = firstResult === "draw" ? null : firstResult === "win" ? first.id : second.id;
  const timestamp = new Date().toISOString();
  const result = {
    round: room.round,
    winnerId,
    players: room.players.map((player) => ({
      id: player.id,
      name: player.name,
      choice: player.choice,
      result: player.id === first.id ? firstResult : secondResult
    })),
    timestamp
  };

  room.history.unshift(result);
  room.history = room.history.slice(0, 40);
  io.to(room.id).emit("round-result", result);
  resetRoundChoices(room);
  room.round += 1;
  touch(room);
  emitRoom(io, room);
}

export function registerRoomHandlers(io, socket) {
  socket.on("create-room", ({ playerName } = {}, callback = () => {}) => {
    const name = sanitizeText(playerName, 28);
    if (name.length < 2) return callback({ ok: false, error: "Enter a valid player name." });

    let roomId = makeId();
    while (rooms.has(roomId)) roomId = makeId();

    const player = createPlayer({ name, socketId: socket.id, isOwner: true });
    const room = {
      id: roomId,
      ownerId: player.id,
      status: "waiting",
      round: 0,
      players: [player],
      history: [],
      chat: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    rooms.set(roomId, room);
    socketToPlayer.set(socket.id, { roomId, playerId: player.id });
    socket.join(roomId);
    callback({ ok: true, room: publicRoom(room), playerId: player.id });
    emitRoom(io, room);
  });

  socket.on("join-room", ({ roomId, playerName } = {}, callback = () => {}) => {
    const cleanRoomId = sanitizeText(roomId, 6).toUpperCase();
    const name = sanitizeText(playerName, 28);
    if (!isValidRoomId(cleanRoomId)) return callback({ ok: false, error: "Invalid room ID." });
    if (name.length < 2) return callback({ ok: false, error: "Enter a valid player name." });

    const room = rooms.get(cleanRoomId);
    if (!room) return callback({ ok: false, error: "Room not found." });
    if (room.players.length >= 2) return callback({ ok: false, error: "Room is full." });
    if (room.players.some((player) => player.name.toLowerCase() === name.toLowerCase())) {
      return callback({ ok: false, error: "That name is already taken in this room." });
    }

    const player = createPlayer({ name, socketId: socket.id });
    room.players.push(player);
    socketToPlayer.set(socket.id, { roomId: cleanRoomId, playerId: player.id });
    socket.join(cleanRoomId);
    touch(room);
    startGameIfReady(io, room);
    callback({ ok: true, room: publicRoom(room), playerId: player.id });
    emitRoom(io, room);
  });

  socket.on("player-ready", ({ roomId, playerId } = {}) => {
    if (!isValidRoomId(roomId) || !isValidPlayerId(playerId)) return;
    const room = rooms.get(roomId);
    const player = room && findPlayer(room, playerId);
    if (!player) return;
    player.isReady = true;
    touch(room);
    startGameIfReady(io, room);
    emitRoom(io, room);
  });

  socket.on("player-choice", ({ roomId, playerId, choice } = {}, callback = () => {}) => {
    if (!isValidRoomId(roomId) || !isValidPlayerId(playerId) || !isValidChoice(choice)) {
      return callback({ ok: false, error: "Invalid move." });
    }
    const room = rooms.get(roomId);
    const player = room && findPlayer(room, playerId);
    if (!room || !player || room.status !== "playing") {
      return callback({ ok: false, error: "Game is not ready." });
    }
    player.choice = choice;
    touch(room);
    callback({ ok: true });
    emitRoom(io, room);
    handleCompletedRound(io, room);
  });

  socket.on("restart", ({ roomId, playerId } = {}) => {
    const room = rooms.get(roomId);
    if (!room || room.ownerId !== playerId) return;
    room.status = room.players.length === 2 ? "playing" : "waiting";
    room.round = room.players.length === 2 ? room.round + 1 : 0;
    resetRoundChoices(room);
    touch(room);
    emitRoom(io, room);
  });

  socket.on("reset-score", ({ roomId, playerId } = {}) => {
    const room = rooms.get(roomId);
    if (!room || room.ownerId !== playerId) return;
    room.players.forEach((player) => {
      player.stats = emptyStats();
      player.choice = null;
    });
    room.history = [];
    touch(room);
    emitRoom(io, room);
  });

  socket.on("kick-player", ({ roomId, playerId, targetId } = {}) => {
    const room = rooms.get(roomId);
    if (!room || room.ownerId !== playerId || targetId === room.ownerId) return;
    const target = findPlayer(room, targetId);
    if (!target) return;
    io.to(target.socketId).emit("kicked", { reason: "The room owner removed you." });
    io.sockets.sockets.get(target.socketId)?.leave(roomId);
    socketToPlayer.delete(target.socketId);
    room.players = room.players.filter((player) => player.id !== targetId);
    room.status = "waiting";
    room.round = 0;
    resetRoundChoices(room);
    touch(room);
    emitRoom(io, room);
  });

  socket.on("close-room", ({ roomId, playerId } = {}) => {
    const room = rooms.get(roomId);
    if (!room || room.ownerId !== playerId) return;
    closeRoom(io, roomId, "The room owner closed the room.");
  });

  socket.on("leave-room", ({ roomId, playerId } = {}) => {
    const room = rooms.get(roomId);
    if (!room) return;
    if (room.ownerId === playerId) return closeRoom(io, roomId, "The room owner left.");
    const player = findPlayer(room, playerId);
    if (!player) return;
    socket.leave(roomId);
    socketToPlayer.delete(socket.id);
    room.players = room.players.filter((item) => item.id !== playerId);
    room.status = "waiting";
    room.round = 0;
    resetRoundChoices(room);
    touch(room);
    emitRoom(io, room);
  });

  socket.on("chat-message", ({ roomId, playerId, message } = {}, callback = () => {}) => {
    const room = rooms.get(roomId);
    const player = room && findPlayer(room, playerId);
    const text = sanitizeText(message, 220);
    if (!room || !player || !text) return callback({ ok: false, error: "Invalid message." });
    const chatMessage = {
      id: `${Date.now()}-${makeId(4)}`,
      playerId,
      playerName: player.name,
      message: text,
      timestamp: new Date().toISOString()
    };
    room.chat.push(chatMessage);
    room.chat = room.chat.slice(-80);
    touch(room);
    io.to(roomId).emit("chat-message", chatMessage);
    emitRoom(io, room);
    callback({ ok: true });
  });

  socket.on("typing", ({ roomId, playerId, isTyping } = {}) => {
    const room = rooms.get(roomId);
    const player = room && findPlayer(room, playerId);
    if (!room || !player) return;
    socket.to(roomId).emit("typing", { playerId, playerName: player.name, isTyping: Boolean(isTyping) });
  });

  socket.on("disconnect", () => {
    const linked = socketToPlayer.get(socket.id);
    if (!linked) return;
    const room = rooms.get(linked.roomId);
    socketToPlayer.delete(socket.id);
    if (!room) return;
    const player = findPlayer(room, linked.playerId);
    if (!player) return;
    if (player.isOwner) return closeRoom(io, room.id, "Connection lost. The room owner disconnected.");
    player.isOnline = false;
    room.status = "waiting";
    resetRoundChoices(room);
    touch(room);
    emitRoom(io, room);
  });
}

export function startRoomCleanup(io) {
  setInterval(() => {
    const now = Date.now();
    for (const [roomId, room] of rooms.entries()) {
      const hasOnlinePlayers = room.players.some((player) => player.isOnline);
      if (!hasOnlinePlayers || now - room.updatedAt > ROOM_TTL_MS) {
        closeRoom(io, roomId, "Room expired due to inactivity.");
      }
    }
  }, 60 * 1000).unref();
}

export function roomCount() {
  return rooms.size;
}
