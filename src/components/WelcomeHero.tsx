"use client";

import { useCallback, useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";
import PaperContainer from "./PaperContainer";
import { CONFIG_SESIONES } from "@/lib/constants";
import { ActiveSessionType } from "@/interfaces/navigation.interface";

export default function WelcomeHero() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSessionType>(null);

  const handleStart = useCallback(() => {
    if (!isStarted) {
      setIsStarted(true);
    }
  }, [isStarted]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleStart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStart]);

  const currentSession = activeSession ? CONFIG_SESIONES[activeSession] : null;

  return (
    <section
      onClick={handleStart}
      className="h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none relative cursor-pointer"
    >
      {/* 🏛️ EL ANCLA CENTRAL AUTOMÁTICA */}
      <div className="flex flex-col items-center w-full max-w-md h-110 relative justify-start z-10">
        {/* TÍTULO PRINCIPAL */}
        <div
          className={`text-center transition-all duration-750 ease-out h-28 flex items-center justify-center ${
            activeSession
              ? "opacity-0 scale-75 pointer-events-none -translate-y-10"
              : isStarted
                ? "transform -translate-y-8 opacity-100"
                : "transform translate-y-6 opacity-100"
          }`}
        >
          <h1 className="font-pincel text-7xl md:text-9xl tracking-wider text-stone-950 uppercase drop-shadow-sm">
            VARM
          </h1>
        </div>

        {/* 🔄 ZONA DE INTERCAMBIO DINÁMICO */}
        <div className="relative w-full flex flex-col items-center mt-4 h-72">
          {/* A. BIENVENIDA INICIAL (Si no ha iniciado) */}
          <div
            className={`flex flex-col gap-2 text-center transition-all duration-500 ease-out absolute top-0 ${
              isStarted
                ? "opacity-0 pointer-events-none transform translate-y-4"
                : "opacity-100"
            }`}
          >
            <h3 className="font-serif text-lg md:text-xl tracking-wide text-stone-900 italic">
              Desarrollador Web Full Stack
            </h3>
            <p className="text-[10px] tracking-[0.25em] text-stone-800 uppercase font-sans font-medium">
              Artesano de Software & Ciberseguridad Defensiva
            </p>
            <p className="animate-pulse font-serif text-sm tracking-[0.2em] text-stone-700 bg-stone-100/40 px-4 py-2 rounded-md backdrop-blur-[1px] mt-10">
              — Click Enter o Haga Clic —
            </p>
          </div>

          {/* B. EL MENÚ PRINCIPAL: Se muestra si inició pero NO hay sección activa */}
          {isStarted && !activeSession && (
            <div className="w-full absolute top-0 transition-all duration-500 opacity-100 animate-[fadeIn_0.5s_ease-out_both]">
              <NavigationMenu
                onSelectOption={(id: ActiveSessionType) => setActiveSession(id)}
              />
            </div>
          )}

          {/* C. LA VENTANA DE CONTENIDO */}
          {currentSession && (
            <div className="w-full absolute -top-24 px-4 md:px-0">
              <PaperContainer
                title={currentSession.title}
                onBack={() => setActiveSession(null)} // Regresa el estado a null para revivir el menú
              >
                {currentSession.component}
              </PaperContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
