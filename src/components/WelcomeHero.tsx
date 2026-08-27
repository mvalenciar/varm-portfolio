"use client";

import { useCallback, useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";
import PaperContainer from "./PaperContainer";
import { CONFIG_SESIONES } from "@/lib/constants";
import { ActiveSessionType } from "@/interfaces/navigation.interface";
import MainTitle from "./MainTitle";
import WelcomePrompt from "./WelcomePrompt";

export default function WelcomeHero() {
  const [isStarted, setIsStarted] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSessionType>(null);

  const handleStart = useCallback(() => {
    if (!isStarted) {
      setIsStarted(true);

      window.dispatchEvent(new Event("initPortfolioSound"));
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
        <MainTitle
          mainTitle="VARM"
          isStarted={isStarted}
          activeSession={activeSession}
        />

        {/* 🔄 ZONA DE INTERCAMBIO DINÁMICO */}
        <div className="relative w-full flex flex-col items-center mt-4 h-72">
          {/* A. BIENVENIDA INICIAL (Si no ha iniciado) */}
          {!isStarted && <WelcomePrompt isStarted={isStarted} />}

          {/* B. EL MENÚ PRINCIPAL: Se muestra si inició pero NO hay sección activa */}
          {isStarted && !activeSession && (
            <div className="w-full absolute top-0 opacity-100">
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
