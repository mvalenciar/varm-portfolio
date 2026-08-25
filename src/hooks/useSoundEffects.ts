import { RefObject, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playWindSound: () => void;
  playFurinSound: () => void;
  playPaperSound: () => void;
}

export function useSoundEffects(): AudioContextType {
  //Estado global de silencio

  const [isMuted, setIsMuted] = useState<boolean>(true);

  //Referencias de las instancias de audio
  const windRef = useRef<HTMLAudioElement | null>(null);
  const furinRef = useRef<HTMLAudioElement | null>(null);
  const paperRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    windRef.current = new Audio("/sounds/forestWindAndBirds.mp3");
    paperRef.current = new Audio("/sounds/paperSound.mp3");
    furinRef.current = new Audio("/sounds/furin.mp3");

    //Configuración atmósfera del viento
    windRef.current.loop = true;
    windRef.current.volume = 0.25;

    // Volumen base furin y papel
    furinRef.current.volume = 0.4;
    paperRef.current.volume = 0.5;

    return () => {
      if (windRef.current) windRef.current.pause();
      if (paperRef.current) paperRef.current.pause();
      if (furinRef.current) furinRef.current.pause();
    };
  }, []);

  // 3. Reacción al estado de Mute Global
  useEffect(() => {
    if (!windRef.current) return;

    if (isMuted) {
      // Si está silenciado, pausamos el viento de fondo
      windRef.current.pause();
    } else {
      // Si se activa el sonido, reproducimos el bucle continuo del viento
      windRef.current.play().catch((error) => {
        console.log(
          "El navegador bloqueó el autoplay hasta que el usuario interactúe:",
          error,
        );
      });
    }
  }, [isMuted]);

  // Disparador sonido papel
  const playPaperSound = () => {
    if (isMuted || !paperRef.current) return;

    // Reinicio del audio
    paperRef.current.currentTime = 0;
    paperRef.current.play().catch(() => {});
  };

  // Disparador sonido de campana
  const playFurinSound = () => {
    if (isMuted || !furinRef.current) return;

    // Reinicio del audio
    furinRef.current.currentTime = 0;
    furinRef.current.play().catch(() => {});
  };

  return {
    isMuted,
    toggleMute: () => setIsMuted((prev) => !prev),
    playWindSound: () => {},
    playFurinSound,
    playPaperSound,
  };
}
