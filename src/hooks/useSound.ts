import { useCallback, useRef, useEffect } from "react";

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  type: OscillatorType,
  duration: number,
  volume: number,
  attack = 0.005,
  decay = 0.1
) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + attack);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration + decay);
  } catch {}
}

export const SOUND_ENABLED_KEY = "portfolio-sounds-enabled";

export function isSoundEnabled(): boolean {
  try {
    return localStorage.getItem(SOUND_ENABLED_KEY) === "true";
  } catch {
    return false;
  }
}

export function setSoundEnabled(enabled: boolean) {
  try {
    localStorage.setItem(SOUND_ENABLED_KEY, String(enabled));
  } catch {}
}

export function useSound() {
  const enabled = useRef(isSoundEnabled());

  useEffect(() => {
    const handler = () => {
      enabled.current = isSoundEnabled();
    };
    window.addEventListener("sound-toggle", handler);
    return () => window.removeEventListener("sound-toggle", handler);
  }, []);

  const click = useCallback(() => {
    if (!enabled.current) return;
    playTone(800, "sine", 0.08, 0.04);
    setTimeout(() => playTone(1000, "sine", 0.06, 0.02), 30);
  }, []);

  const hover = useCallback(() => {
    if (!enabled.current) return;
    playTone(600, "sine", 0.05, 0.015);
  }, []);

  const pop = useCallback(() => {
    if (!enabled.current) return;
    playTone(440, "triangle", 0.15, 0.06);
    setTimeout(() => playTone(880, "sine", 0.1, 0.03), 50);
  }, []);

  const whoosh = useCallback(() => {
    if (!enabled.current) return;
    try {
      const ctx = getAudioContext();
      if (ctx.state === "suspended") ctx.resume();
      const bufferSize = ctx.sampleRate * 0.3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.05;
      }
      const src = ctx.createBufferSource();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 0.3);
      src.buffer = buffer;
      src.connect(filter);
      filter.connect(ctx.destination);
      src.start();
    } catch {}
  }, []);

  const success = useCallback(() => {
    if (!enabled.current) return;
    [523, 659, 784].forEach((freq, i) => {
      setTimeout(() => playTone(freq, "sine", 0.2, 0.05), i * 80);
    });
  }, []);

  const chatOpen = useCallback(() => {
    if (!enabled.current) return;
    playTone(523, "sine", 0.12, 0.04);
    setTimeout(() => playTone(659, "sine", 0.1, 0.03), 80);
  }, []);

  return { click, hover, pop, whoosh, success, chatOpen };
}
