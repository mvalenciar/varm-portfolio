"use client";

import { useEffect, useState } from "react";
import WelcomeHero from "@/components/WelcomeHero";
import VisitorLoading from "./loading";

import CustomCursor from "@/components/CustomCursor";
import FurinBell from "@/components/FurinBell";
import SakuraCanvas from "@/components/SakuraCanvas";
import AudioController from "@/components/AudioController";
import SocialNetworks from "@/components/SocialNetworks";
import OrientationGuard from "@/components/OrientationGuard";

export default function VisitorPage() {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    // 1. Registro silencioso de analíticas en Supabase
    fetch("/api/analytics", { method: "POST" })
      .then((res) => res.json())
      .catch((err) => console.error("Error silencioso de analíticas:", err));

    // 🧠 2. PRE-CARGA ELÁSTICA MULTIMEDIA MATEMÁTICA
    // Definimos las promesas para los archivos que más pesan en redes 3G
    const preloadAssets = async () => {
      try {
        const audioFiles = [
          "/sounds/forestWindAndBirds.mp3",
          "/sounds/furin-wind-chime.mp3",
          "/sounds/furin.ogg",
          "/sounds/hyoshigi.mp3",
          "/sounds/mokugyo.flac",
          "/sounds/paperSound.mp3",
        ];

        const promises = [
          // A. Promesa para la imagen pesada del Monte Fuji
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = "/images/sakura-bg.jpg";
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resguardo por si falla la imagen, no congelar el sitio
          }),

          // B. Promesas en ráfaga para precargar cada archivo de audio en la caché de la RAM
          ...audioFiles.map((url) => {
            return new Promise<void>((resolve) => {
              const audio = new Audio();
              audio.src = url;
              // El evento 'canplaythrough' avisa que el audio ya se descargó completo y puede sonar sin cortes
              audio.oncanplaythrough = () => resolve();
              audio.onerror = () => resolve(); // Resguardo defensivo
            });
          }),
        ];

        // Esperamos a que TODOS los archivos bajen por red, no importa la velocidad
        await Promise.all(promises);

        // Micro-respiro de cortesía de 300ms solo para que la transición no sea brusca en redes ultra veloces
        await new Promise((resolve) => setTimeout(resolve, 300));
      } catch (error) {
        console.error("Error en la precarga elástica:", error);
      } finally {
        // Abrimos el telón con la certeza absoluta de que todo sonará al instante
        setIsHydrated(true);
      }
    };

    preloadAssets();
  }, []);

  if (!isHydrated) {
    return <VisitorLoading />;
  }

  return (
    <main className="w-full h-full relative">
      <OrientationGuard />

      <div className="w-full h-full landscape:max-md:hidden animate-fadeIn">
        <SakuraCanvas />
        <CustomCursor />
        <FurinBell />
        <AudioController />
        <SocialNetworks />
        <WelcomeHero />
      </div>
    </main>
  );
}
