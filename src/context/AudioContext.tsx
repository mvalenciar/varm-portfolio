"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import gsap from "gsap";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playWindSound: () => void;
  playFurinSound: () => void;
  playPaperSound: () => void;
  playHyoshigiSound: () => void;
  playBrushPencilSound: () => void;
  playMokugyoSound: () => void;
  initPortfolioSound: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  // Referencias para el sistema
  const windRef = useRef<HTMLAudioElement | null>(null);
  const furinRef = useRef<HTMLAudioElement | null>(null);
  const paperRef = useRef<HTMLAudioElement | null>(null);
  const hyoshigiRef = useRef<HTMLAudioElement | null>(null);
  const brushPencilSoundRef = useRef<HTMLAudioElement | null>(null);
  const mokugyoSoundRef = useRef<HTMLAudioElement | null>(null);
  const furinWindIntroRef = useRef<HTMLAudioElement | null>(null);

  // Carga de archivos de audio
  useEffect(() => {
    windRef.current = new Audio("/sounds/forestWindAndBirds.mp3");
    paperRef.current = new Audio("/sounds/paperSound.mp3");
    furinRef.current = new Audio("/sounds/furin.ogg");
    hyoshigiRef.current = new Audio("/sounds/hyoshigi.mp3");
    brushPencilSoundRef.current = new Audio("/sounds/brushPencil.mp3");
    mokugyoSoundRef.current = new Audio("/sounds/mokugyo.flac");
    furinWindIntroRef.current = new Audio("/sounds/furin-wind-chime.mp3");

    furinWindIntroRef.current.volume = 0.5;
    windRef.current.loop = true;
    windRef.current.volume = 0.25;
    furinRef.current.volume = 0.4;
    paperRef.current.volume = 0.5;
    hyoshigiRef.current.volume = 0.3;
    brushPencilSoundRef.current.volume = 0.5;
    mokugyoSoundRef.current.volume = 0.3;

    return () => {
      furinWindIntroRef.current?.pause();
      windRef.current?.pause();
      paperRef.current?.pause();
      furinRef.current?.pause();
      hyoshigiRef.current?.pause();
      brushPencilSoundRef.current?.pause();
      mokugyoSoundRef.current?.pause();
    };
  }, []);

  // control reactivo del viento
  useEffect(() => {
    if (!windRef.current) return;

    if (isMuted) {
      windRef.current.pause();
    } else {
      windRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  // Control campanita automática ambiental
  useEffect(() => {
    let furinWatch: NodeJS.Timeout;
    const jingleTime = () => {
      return setTimeout(
        () => {
          if (!isMuted && furinRef.current) {
            furinRef.current.currentTime = 0;
            furinRef.current.play().catch(() => {});
          }
          furinWatch = jingleTime();
        },
        Math.random() * 5000 + 10000,
      );
    };

    if (!isMuted) furinWatch = jingleTime();
    return () => clearTimeout(furinWatch);
  }, [isMuted]);

  // Funciones lógicas de reproducción de sonido

  const initPortfolioSound = useCallback(() => {
    if (!furinWindIntroRef.current || !windRef.current) return;

    setIsMuted(false);

    furinWindIntroRef.current.currentTime = 0;
    furinWindIntroRef.current.play().catch(() => {});

    windRef.current.volume = 0;

    setTimeout(() => {
      if (windRef.current) {
        gsap.to(windRef.current, { volume: 0.25, duration: 2.0 });
      }
    }, 3500);
  }, []);

  const playPaperSound = useCallback(() => {
    if (isMuted || !paperRef.current) return;
    paperRef.current.currentTime = 0;
    paperRef.current.play().catch(() => {});
  }, [isMuted]);

  const playFurinSound = useCallback(() => {
    if (isMuted || !furinRef.current) return;
    furinRef.current.currentTime = 0;
    furinRef.current.play().catch(() => {});
  }, [isMuted]);

  const playHyoshigiSound = useCallback(() => {
    if (isMuted || !hyoshigiRef.current) return;
    hyoshigiRef.current.currentTime = 0;
    hyoshigiRef.current.play().catch(() => {});
  }, [isMuted]);

  const playBrushPencilSound = useCallback(() => {
    if (isMuted || !brushPencilSoundRef.current) return;
    brushPencilSoundRef.current.currentTime = 0;
    brushPencilSoundRef.current.play().catch(() => {});
  }, [isMuted]);

  const playMokugyoSound = useCallback(() => {
    if (isMuted || !mokugyoSoundRef.current) return;
    mokugyoSoundRef.current.currentTime = 0;
    mokugyoSoundRef.current.play().catch(() => {});
  }, [isMuted]);

  useEffect(() => {
    window.addEventListener("initPortfolioSound", initPortfolioSound);
    return () => {
      window.removeEventListener("initPortfolioSound", initPortfolioSound);
    };
  }, [initPortfolioSound]);

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute: () => setIsMuted((prev) => !prev),
        playWindSound: () => {},
        playFurinSound,
        playPaperSound,
        playHyoshigiSound,
        playBrushPencilSound,
        playMokugyoSound,
        initPortfolioSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function usePortfolioAudio() {
  const context = useContext(AudioContext);
  if (!context)
    throw new Error("usePortfolioAudio debe usarse dentro de un AudioProvider");
  return context;
}
