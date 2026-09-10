"use client";

import { usePortfolioAudio } from "@/context/AudioContext";
import { useFurin } from "@/hooks/useFurin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FurinBell() {
  const { bellRef } = useFurin();
  const { playFurinSound, playMokugyoSound, playHyoshigiSound } =
    usePortfolioAudio();
  const router = useRouter();

  const navigateToAdmin = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    playMokugyoSound();
    if (router) {
      router.push("/admin/dashboard");
    }
  };

  useEffect(() => {
    playFurinSound();
  }, [playFurinSound]);

  return (
    <div
      ref={bellRef}
      className="fixed top-0 right-4 md:right-16 flex flex-col items-center origin-top select-none scale-75 md:scale-100 transition-transform duration-300 group z-9999"
    >
      {/* 🧵 HILO SUPERIOR */}
      <div className="w-px h-6 md:h-16 bg-stone-500/60 transition-all duration-300" />

      {/* 🔔 CAMPANA DE CRISTAL  */}
      <div className="w-8 h-6 md:w-10 md:h-8 bg-stone-100/40 backdrop-blur-[2px] border border-stone-400/50 rounded-t-full relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-end justify-center transition-all duration-300">
        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-stone-600 rounded-full absolute -bottom-0.5" />
      </div>

      {/* 🧵 HILO INTERMEDIO */}
      <div className="w-px h-2 md:h-4 bg-stone-550/65" />

      {/* 📜  CINTA DE PAPEL INTERACTIVA */}

      <button
        onClick={navigateToAdmin}
        onMouseEnter={playHyoshigiSound}
        className="w-5 h-16 md:w-6 md:h-28 bg-[#faf8f5] border border-[#d7c9be]/80 shadow-[1px_2px_5px_rgba(0,0,0,0.04)] rounded-sm flex flex-col items-center justify-start pt-1.5 md:pt-3 px-0.5 md:px-1 transition-all duration-300 group-hover:bg-red-50/60 group-hover:border-red-750/40 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer relative z-10000 focus:outline-none pointer-events-auto"
      >
        <p
          className="font-yuzarsif text-[7px] md:text-[9px] tracking-[0.15em] md:tracking-[0.2em] text-stone-800 uppercase font-medium group-hover:text-[#8a1c14] transition-colors duration-350 select-none text-center pointer-events-none"
          style={{ writingMode: "vertical-rl" }}
        >
          Admin // 管理
        </p>
      </button>
    </div>
  );
}
