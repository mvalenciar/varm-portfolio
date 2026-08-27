"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface WelcomePromptProps {
  isStarted: boolean;
}

export default function WelcomePrompt({ isStarted }: WelcomePromptProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Animación de Entrada: Aparece después del trazo del MainTitle
  useEffect(() => {
    if (!containerRef.current) return;

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          delay: 1.8,
        },
      );
    }

    return () => {};
  }, []);

  // Animación de Salida Asíncrona: Cuando el usuario presiona Enter/Clic
  useEffect(() => {
    if (isStarted && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -20, // Se desvanece flotando hacia arriba
        duration: 0.5,
        ease: "power2.inIn",
        pointerEvents: "none", // Evita que reciba interacciones ocultas
      });
    }
  }, [isStarted]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-2 text-center absolute top-0 opacity-0 will-change-transform"
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
  );
}
