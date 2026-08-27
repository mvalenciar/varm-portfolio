import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePortfolioAudio } from "@/context/AudioContext";

interface PaperContainerProps {
  title: string;

  onBack: () => void;
  children: React.ComponentType;
}

export default function PaperContainer({
  title,

  onBack,
  children: Component,
}: PaperContainerProps) {
  // Referencia para el contenedor del papel

  const paperRef = useRef<HTMLDivElement>(null);

  const { playPaperSound, playMokugyoSound, playHyoshigiSound } =
    usePortfolioAudio();

  useEffect(() => {
    if (paperRef.current) {
      gsap.fromTo(
        paperRef.current,
        {
          opacity: 0,
          y: 50,
          scale: 0.92,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.6)",
        },
      );
    }

    playPaperSound();
  }, [playPaperSound]);

  const executeExitAndReturn = () => {
    if (paperRef.current) {
      gsap.to(paperRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.94,
        duration: 0.4,
        ease: "back.in",
        onComplete: () => onBack(),
      });
    } else {
      onBack();
    }
  };

  return (
    <div
      ref={paperRef}
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-lg mx-auto p-6 md:p-8
                 bg-[#faf8f5] 
                 border border-[#d7c9be]/60
                 rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                 shadow-[2px_5px_15px_rgba(0,0,0,0.05),inset_0_0_20px_rgba(240,235,225,0.5)]
                 overflow-hidden"
    >
      <div className="font-serif text-[#2b2b2b] leading-relaxed">
        {/* Cabecera */}
        <div className="flex justify-between items-center border-b border-dashed border-[#8a1c14]/30 pb-3 mb-5">
          <h2 className="text-xl font-bold text-[#8a1c14] tracking-wide">
            {title}
          </h2>
          {/* Botón para volver */}
          <button
            onClick={(e) => {
              e.preventDefault();
              executeExitAndReturn();
              playMokugyoSound();
            }}
            onMouseEnter={playHyoshigiSound}
            className="font-yuzarsif text-base tracking-widest text-stone-600 hover:text-[#8a1c14] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] cursor-pointer"
          >
            ◀ VOLVER
          </button>
        </div>

        {/* Cuerpo de la Ventana */}
        <div className="text-stone-800 font-sans text-sm md:text-base selection:bg-amber-100">
          <Component />
        </div>
      </div>
    </div>
  );
}
