"use client";

import { usePortfolioAudio } from "@/context/AudioContext";
import React from "react";

export default function AudioController() {
  const { isMuted, toggleMute } = usePortfolioAudio();

  return (
    <button
      onClick={toggleMute}
      aria-label={
        isMuted ? "Activar sonido del portafolio" : "Silenciar portafolio"
      }
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 bg-stone-100/40 backdrop-blur-md border border-stone-300/60 rounded-full text-stone-700 hover:text-[#8a1c14] hover:border-[#8a1c14]/40 hover:bg-stone-100/80 transition-all duration-300 shadow-sm cursor-pointer pointer-events-auto group"
    >
      {isMuted ? (
        /* Icono Minimalista: Nota Musical Apagada o Cruzada */
        <svg
          xmlns="http://w3.org"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
          />
        </svg>
      ) : (
        /* Icono Minimalista: Ondas de Sonido Orgánicas */
        <svg
          xmlns="http://w3.org"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-[#8a1c14] transition-transform duration-300 group-hover:scale-110"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
          />
        </svg>
      )}
    </button>
  );
}
