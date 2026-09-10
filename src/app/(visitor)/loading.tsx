"use client";

export default function VisitorLoading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-stone-900 font-sans text-stone-100 antialiased selection:bg-red-500 selection:text-white">
      {/* Container Central Simétrico */}
      <div className="flex flex-col items-center space-y-6 max-w-xs text-center px-4">
        {/* INDICADOR INTERACTIVO CARMESÍ */}
        <div className="relative flex h-10 w-10 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-[#8a1c14]/20 opacity-75" />
          <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-stone-700 border-t-[#8a1c14]" />
        </div>

        {/* TEXTO EDITORIAL TRADICIONAL */}
        <div className="space-y-1">
          <h2 className="font-serif text-lg font-bold tracking-[0.2em] text-stone-100 uppercase">
            VARM // PORTFOLIO
          </h2>
          <p className="font-yuzarsif text-[10px] tracking-[0.25em] text-stone-400 uppercase font-medium animate-pulse">
            Cargando Lienzo Relacional // 読込中
          </p>
        </div>

        {/* Microbarra de progreso calibrada con nuestra clase limpia de globals.css */}
        <div className="h-[1px] w-32 bg-stone-800 relative overflow-hidden rounded-full">
          <div className="h-full bg-[#8a1c14] absolute left-0 top-0 animate-loading-bar" />
        </div>
      </div>

      {/* PIE DE PÁGINA TRADICIONAL JAPONÉS */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <span className="font-serif text-[9px] text-stone-500 tracking-[0.3em] uppercase block">
          Artesanía Digital • Monozukuri
        </span>
      </div>
    </div>
  );
}
