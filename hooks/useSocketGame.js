import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { io } from "socket.io-client";
import { useSound } from "./useSound.js";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export function useSocketGame() {
  const socketRef = useRef(null);
  const playerIdRef = useRef("");
  const soundRef = useRef(() => {});
  const playSound = useSound();
  const [room, setRoom] = useState(null);
  const [playerId, setPlayerId] = useState("");
  const [view, setView] = useState("landing");
  const [notice, setNotice] = useState("");
  const [lastResult, setLastResult] = useState(null);
  const [connection, setConnection] = useState("connecting");
  const [typingPlayer, setTypingPlayer] = useState("");

  useEffect(() => {
    playerIdRef.current = playerId;
  }, [playerId]);

  useEffect(() => {
    soundRef.current = playSound;
  }, [playSound]);

  useEffect(() => {
    const socket = io(SERVER_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelayMax: 4000
    });
    socketRef.current = socket;

    socket.on("connect", () => setConnection("online"));
    socket.on("disconnect", () => {
      setConnection("offline");
      setNotice("Connection lost. Reconnecting...");
    });
    socket.on("reconnect", () => setNotice("Connection restored."));
    socket.on("room-state", (nextRoom) => {
      setRoom(nextRoom);
      setView(nextRoom.status === "playing" ? "game" : "waiting");
    });
    socket.on("game-started", () => {
      setView("game");
      setLastResult(null);
      soundRef.current("click");
    });
    socket.on("round-result", (result) => {
      setLastResult(result);
      const mine = result.players.find((player) => player.id === playerIdRef.current);
      if (mine?.result === "win") {
        confetti({ particleCount: 140, spread: 70, origin: { y: 0.62 } });
        soundRef.current("win");
      } else {
        soundRef.current(mine?.result === "draw" ? "draw" : "lose");
      }
    });
    socket.on("room-closed", ({ reason }) => {
      setNotice(reason);
      setRoom(null);
      setPlayerId("");
      setView("landing");
    });
    socket.on("kicked", ({ reason }) => {
      setNotice(reason);
      setRoom(null);
      setPlayerId("");
      setView("landing");
    });
    socket.on("chat-message", () => soundRef.current("message"));
    socket.on("typing", ({ playerName, isTyping }) => {
      setTypingPlayer(isTyping ? playerName : "");
      if (isTyping) setTimeout(() => setTypingPlayer(""), 1800);
    });

    return () => socket.disconnect();
  }, []);

  const request = useCallback((event, payload) => {
    return new Promise((resolve) => {
      if (!socketRef.current?.connected) {
        resolve({ ok: false, error: "Server is not connected yet. Wait a moment and try again." });
        return;
      }

      const timeout = setTimeout(() => {
        resolve({ ok: false, error: "Server did not respond. Check the backend terminal for errors." });
      }, 6000);

      socketRef.current.emit(event, payload, (response) => {
        clearTimeout(timeout);
        resolve(response);
      });
    });
  }, []);

  const createRoom = useCallback(
    async (playerName) => {
      const response = await request("create-room", { playerName });
      if (!response.ok) {
        setNotice(response.error);
        return false;
      }
      setRoom(response.room);
      setPlayerId(response.playerId);
      setView("waiting");
      setNotice("");
      return true;
    },
    [request]
  );

  const joinRoom = useCallback(
    async (roomId, playerName) => {
      const response = await request("join-room", { roomId, playerName });
      if (!response.ok) {
        setNotice(response.error);
        return false;
      }
      setRoom(response.room);
      setPlayerId(response.playerId);
      setView(response.room.status === "playing" ? "game" : "waiting");
      setNotice("");
      return true;
    },
    [request]
  );

  const emitGame = useCallback(
    (event, extra = {}) => {
      if (!room || !playerId) return;
      socketRef.current.emit(event, { roomId: room.id, playerId, ...extra });
    },
    [room, playerId]
  );

  const choose = useCallback(
    (choice) => {
      if (!room || !playerId) return;
      playSound("click");
      setLastResult(null);
      socketRef.current.emit("player-choice", { roomId: room.id, playerId, choice }, (response) => {
        if (!response?.ok) setNotice(response?.error || "Move rejected.");
      });
    },
    [room, playerId, playSound]
  );

  const sendChat = useCallback(
    (message) => {
      if (!room || !playerId) return;
      socketRef.current.emit("chat-message", { roomId: room.id, playerId, message }, (response) => {
        if (!response?.ok) setNotice(response?.error || "Message rejected.");
      });
    },
    [room, playerId]
  );

  const setTyping = useCallback(
    (isTyping) => {
      if (!room || !playerId) return;
      socketRef.current.emit("typing", { roomId: room.id, playerId, isTyping });
    },
    [room, playerId]
  );

  const leave = useCallback(() => {
    emitGame("leave-room");
    setRoom(null);
    setPlayerId("");
    setView("landing");
  }, [emitGame]);

  const game = useMemo(
    () => ({
      room,
      playerId,
      view,
      notice,
      connection,
      lastResult,
      typingPlayer,
      setNotice,
      setView,
      createRoom,
      joinRoom,
      choose,
      sendChat,
      setTyping,
      restart: () => emitGame("restart"),
      resetScore: () => emitGame("reset-score"),
      kickPlayer: (targetId) => emitGame("kick-player", { targetId }),
      closeRoom: () => emitGame("close-room"),
      leave
    }),
    [
      room,
      playerId,
      view,
      notice,
      connection,
      lastResult,
      typingPlayer,
      createRoom,
      joinRoom,
      choose,
      sendChat,
      setTyping,
      emitGame,
      leave
    ]
  );

  return game;
}
