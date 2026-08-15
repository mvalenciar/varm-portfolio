"use client";

import React, { useCallback, useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";

export default function WelcomeHero() {
  const [isStarted, setIsStarted] = useState(false);

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

  return (
    <section
      onClick={handleStart}
      className="h-screen w-full flex flex-col items-center justify-center overflow-hidden select-none relative cursor-pointer"
    >
      {/* 🏛️ EL ANCLA CENTRAL: Altura y ancho fijos para blindar el diseño contra saltos */}
      <div className="flex flex-col items-center w-full max-w-md h-96 relative justify-start z-10">
        {/* ✍️ CONTENEDOR DEL TÍTULO PRINCIPAL */}
        {/* Se desplaza hacia arriba con suavidad en su propio eje, sin afectar a nada más */}
        <div
          className={`text-center transition-transform duration-750 ease-out h-32 flex items-center justify-center ${
            isStarted ? "transform -translate-y-8" : "transform translate-y-6"
          }`}
        >
          <h1 className="font-pincel text-7xl md:text-9xl tracking-wider text-stone-950 uppercase drop-shadow-sm">
            VARM
          </h1>
        </div>

        {/* 🔄 ZONA DE CONTENIDO INTERCAMBIABLE (Subtítulos o Menú) */}
        {/* Ambos posicionados de forma absoluta en el mismo carril para evitar Layout Shifts */}
        <div className="relative w-full flex flex-col items-center mt-6 h-56">
          {/* A. LOS SUBTÍTULOS: Se desvanecen limpiamente hacia abajo */}
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

            {/* 🕹️ El texto de inicio ahora vive aquí abajo, contenido dentro de la bienvenida */}
            <p className="animate-pulse font-serif text-sm tracking-[0.2em] text-stone-700 bg-stone-100/40 px-4 py-2 rounded-md backdrop-blur-[1px] mt-10">
              — Click Enter o Haga Clic —
            </p>
          </div>

          {/* B. EL MENÚ: Emerge en el mismo espacio con el retraso cinematográfico */}
          {isStarted && (
            <div
              className="w-full absolute top-0 transition-all duration-700 opacity-100 scale-100 animate-[fadeIn_0.7s_ease-out_both]"
              style={{ animationDelay: "350ms" }}
            >
              <NavigationMenu />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
