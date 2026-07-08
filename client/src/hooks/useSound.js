import { useCallback, useRef } from "react";
import { useApp } from "../context/AppContext.jsx";

const effects = {
  click: [
    { frequency: 360, start: 0, duration: 0.04, volume: 0.035, type: "square" }
  ],
  message: [
    { frequency: 520, start: 0, duration: 0.05, volume: 0.03, type: "sine" }
  ],
  draw: [
    { frequency: 420, start: 0, duration: 0.08, volume: 0.04, type: "triangle" },
    { frequency: 420, start: 0.1, duration: 0.08, volume: 0.035, type: "triangle" }
  ],
  win: [
    { frequency: 523.25, start: 0, duration: 0.08, volume: 0.055, type: "triangle" },
    { frequency: 659.25, start: 0.08, duration: 0.08, volume: 0.06, type: "triangle" },
    { frequency: 783.99, start: 0.16, duration: 0.09, volume: 0.065, type: "triangle" },
    { frequency: 1046.5, start: 0.25, duration: 0.16, volume: 0.075, type: "sawtooth" },
    { frequency: 1318.51, start: 0.42, duration: 0.13, volume: 0.045, type: "sine" }
  ],
  lose: [
    { frequency: 392, start: 0, duration: 0.16, volume: 0.05, type: "sine" },
    { frequency: 329.63, start: 0.15, duration: 0.18, volume: 0.045, type: "sine" },
    { frequency: 261.63, start: 0.32, duration: 0.25, volume: 0.04, type: "triangle" },
    { frequency: 196, start: 0.58, duration: 0.32, volume: 0.035, type: "sine" }
  ]
};

export function useSound() {
  const { soundEnabled } = useApp();
  const audioContextRef = useRef(null);

  return useCallback(
    (name = "click") => {
      const AudioEngine = window.AudioContext || window.webkitAudioContext;
      if (!soundEnabled || !AudioEngine) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioEngine();
      }

      const audioContext = audioContextRef.current;
      const sequence = effects[name] || effects.click;

      sequence.forEach(({ frequency, start, duration, volume, type }) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startsAt = audioContext.currentTime + start;
        const endsAt = startsAt + duration;

        oscillator.frequency.setValueAtTime(frequency, startsAt);
        oscillator.type = type;
        gain.gain.setValueAtTime(0.001, startsAt);
        gain.gain.exponentialRampToValueAtTime(volume, startsAt + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, endsAt);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(startsAt);
        oscillator.stop(endsAt + 0.02);
      });
    },
    [soundEnabled]
  );
}
