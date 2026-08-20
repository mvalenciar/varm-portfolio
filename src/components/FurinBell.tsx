"use client";

import React from "react";

export default function FurinBell() {
  const handleAdminClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita activar el inicio del Hero
    console.log("Disparando acceso al panel de administración...");
  };

  return (
    <div
      onClick={handleAdminClick}
      /* Anclado arriba a la derecha. Tiene la animación 'swing' constante del viento */
      className="fixed top-0 right-10 md:right-16 z-40 flex flex-col items-center animate-[swing_4s_ease-in-out_infinite] origin-top select-none group cursor-none"
    >
      {/* 🧵 1. EL HILO (String) */}
      <div className="w-[1px] h-12 md:h-16 bg-stone-500/60" />

      {/* 🔔 2. LA CAMPANA DE CRISTAL (Glass Bell) */}
      {/* Moldeada con bordes redondeados asimétricos para simular cristal soplado a mano */}
      <div className="w-10 h-8 bg-stone-100/40 backdrop-blur-[2px] border border-stone-400/50 rounded-t-full relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)] flex items-end justify-center">
        {/* El badajo interno (Zets) que golpea la campana */}
        <div className="w-1.5 h-1.5 bg-stone-600 rounded-full absolute -bottom-0.5" />
      </div>

      {/* 🧵 3. EL HILO INTERMEDIO */}
      <div className="w-[1px] h-4 bg-stone-550/65" />

      {/* 📜 4. LA CINTA DE PAPEL TRADICIONAL (Tanzaku) */}
      {/* Aquí aplicamos tu brillante idea: texto vertical, fondo crema washi y bordes limpios */}
      <div className="w-6 h-28 bg-[#faf8f5] border border-[#d7c9be]/80 shadow-[1px_2px_5px_rgba(0,0,0,0.04)] rounded-sm flex flex-col items-center justify-start pt-3 px-1 transition-all duration-300 group-hover:bg-red-50/60 group-hover:border-red-750/40 group-hover:shadow-[0_0_10px_rgba(255,255,255,0.8)]">
        {/* Texto Vertical: Combinamos font-yuzarsif con la propiedad 'writing-mode' de CSS */}
        <p
          className="font-yuzarsif text-[9px] tracking-[0.2em] text-stone-800 uppercase font-medium group-hover:text-[#8a1c14] transition-colors duration-350 select-none text-center"
          style={{ writingMode: "vertical-rl" }} // 🟢 Fuerza la lectura de arriba hacia abajo
        >
          Admin // 管理
        </p>
      </div>
    </div>
  );
}
