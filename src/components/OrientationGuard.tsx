"use client";

export default function OrientationGuard() {
  return (
    <div className="hidden landscape:max-md:flex fixed inset-0 z-99999 bg-stone-900 flex-col items-center justify-center p-6 text-center text-stone-100 antialiased select-none pointer-events-auto">
      {/* Contenedor Central Simétrico */}
      <div className="flex flex-col items-center space-y-5 max-w-xs text-center px-4 animate-pulse">
        {/* 📱🔄 MICRO-ANIMACIÓN TRADICIONAL CARDINAL */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-stone-800 bg-stone-950/40 text-xl shadow-inner">
          <span className="animate-[spin_4s_infinite_linear]">🔄</span>
        </div>

        {/* 📜 MANIFIESTO EDITORIAL DE RESTRICCIÓN */}
        <div className="space-y-1.5">
          <h2 className="font-serif text-xs font-bold tracking-[0.25em] text-stone-200 uppercase">
            Orientación Requerida
          </h2>
          <p className="font-yuzarsif text-[10px] tracking-[0.2em] text-[#8a1c14] uppercase font-semibold">
            Por favor regresa a posición vertical
          </p>
        </div>

        {/* Línea de resguardo tradicional */}
        <div className="h-px w-24 bg-stone-800" />

        {/* Texto explicativo tradicional */}
        <p className="font-serif text-[9px] text-stone-500 tracking-[0.15em] leading-relaxed uppercase">
          El lienzo tradicional japonés exige un visor vertical // 縦向き表示
        </p>
      </div>

      {/* PIE DE PÁGINA TRADICIONAL */}
      <div className="absolute bottom-6 left-0 w-full text-center">
        <span className="font-serif text-[8px] text-stone-600 tracking-[0.3em] uppercase block">
          Artesanía Digital • Monozukuri
        </span>
      </div>
    </div>
  );
}
