"use client";

import { usePortfolioAudio } from "@/context/AudioContext";
import { useFurin } from "@/hooks/useFurin";
import { useEffect } from "react";

export default function FurinBell() {
  const { bellRef } = useFurin();
  const { playFurinSound } = usePortfolioAudio();

  const handleAdminClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    console.log("Disparando acceso al panel de administración...");
  };

  useEffect(() => {
    playFurinSound();
  }, [playFurinSound]);

  return (
    <div
      ref={bellRef}
      onClick={handleAdminClick}
      className="fixed top-2 md:top-0 right-4 md:right-16 flex flex-col items-center origin-top select-none scale-75 md:scale-100 transition-transform duration-300 group cursor-none"
    >
      {/* Todo el interior (Hilo, cristal, Tanzaku) se queda EXACTAMENTE IGUAL */}
      {/* 🧵 1. EL HILO (String) */}
      <div className="w-px h-12 md:h-16 bg-stone-500/60" />

      {/* 🔔 2. LA CAMPANA DE CRISTAL (Glass Bell) */}
      <div className="w-10 h-8 bg-stone-100/40 backdrop-blur-[2px] border border-stone-400/50 rounded-t-full relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-end justify-center">
        <div className="w-1.5 h-1.5 bg-stone-600 rounded-full absolute -bottom-0.5" />
      </div>

      {/* 🧵 3. EL HILO INTERMEDIO */}
      <div className="w-px h-4 bg-stone-550/65" />

      {/* 📜 4. LA CINTA DE PAPEL TRADICIONAL (Tanzaku) */}
      <div className="w-6 h-28 bg-[#faf8f5] border border-[#d7c9be]/80 shadow-[1px_2px_5px_rgba(0,0,0,0.04)] rounded-sm flex flex-col items-center justify-start pt-3 px-1 transition-all duration-300 group-hover:bg-red-50/60 group-hover:border-red-750/40 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        <p
          className="font-yuzarsif text-[9px] tracking-[0.2em] text-stone-800 uppercase font-medium group-hover:text-[#8a1c14] transition-colors duration-350 select-none text-center"
          style={{ writingMode: "vertical-rl" }}
        >
          Admin // 管理
        </p>
      </div>
    </div>
  );
}
