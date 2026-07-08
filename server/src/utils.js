import crypto from "crypto";

const SAFE_TEXT = /[<>"'`\\]/g;
const CHOICES = new Set(["rock", "paper", "scissors"]);

export function sanitizeText(value, maxLength = 80) {
  return String(value || "")
    .trim()
    .slice(0, maxLength)
    .replace(SAFE_TEXT, "");
}

export function isValidRoomId(value) {
  return /^[A-Z0-9]{6}$/.test(String(value || ""));
}

export function isValidPlayerId(value) {
  return /^PLR-[A-Z0-9]{6}$/.test(String(value || ""));
}

export function isValidChoice(choice) {
  return CHOICES.has(choice);
}

export function makeId(length = 6) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < length; i += 1) {
    id += alphabet[crypto.randomInt(0, alphabet.length)];
  }
  return id;
}

export function makePlayerId() {
  return `PLR-${makeId(6)}`;
}

export function calculateRound(choice, opponentChoice) {
  if (choice === opponentChoice) return "draw";
  if (
    (choice === "rock" && opponentChoice === "scissors") ||
    (choice === "paper" && opponentChoice === "rock") ||
    (choice === "scissors" && opponentChoice === "paper")
  ) {
    return "win";
  }
  return "loss";
}

export function emptyStats() {
  return {
    wins: 0,
    losses: 0,
    draws: 0,
    roundsPlayed: 0,
    winPercentage: 0,
    currentStreak: 0,
    longestStreak: 0
  };
}

export function applyResult(stats, result) {
  const next = { ...stats, roundsPlayed: stats.roundsPlayed + 1 };
  if (result === "win") {
    next.wins += 1;
    next.currentStreak += 1;
    next.longestStreak = Math.max(next.longestStreak, next.currentStreak);
  } else {
    if (result === "loss") next.losses += 1;
    if (result === "draw") next.draws += 1;
    next.currentStreak = 0;
  }
  next.winPercentage = next.roundsPlayed
    ? Math.round((next.wins / next.roundsPlayed) * 100)
    : 0;
  return next;
}
