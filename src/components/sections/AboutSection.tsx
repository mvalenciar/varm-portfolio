"use client";

import { useVisitorProfile } from "@/hooks/useVisitorProfile";

export default function AboutSection() {
  const { profile, isLoading, error } = useVisitorProfile();

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center font-sans">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-200 border-t-[#8a1c14]" />
      </div>
    );
  }

  // 🛡️ RESPALDO DEFENSIVO: Texto fijo honesto y limpio si falla la base de datos
  if (error || !profile) {
    return (
      <div className="space-y-5 h-64 overflow-y-auto pr-1 font-sans text-stone-700 text-sm md:text-base leading-relaxed animate-fadeIn">
        <p className="font-semibold text-stone-950 text-base">
          Hola, soy Milton Alonso Valencia Rincón, un desarrollador Full Stack
          operando desde Puerto Asís, Putumayo.
        </p>
        <p>
          Mi enfoque se centra en la pulcritud de la{" "}
          <span className="text-[#8a1c14] font-semibold">
            Arquitectura Limpia
          </span>{" "}
          y la robustez del{" "}
          <span className="text-[#8a1c14] font-semibold">Testing</span>.
        </p>
        <p>
          Concibo el desarrollo web como un proceso artesanal (Monozukuri),
          buscando que cada línea de código sea mantenible, segura y libre de
          estrés técnico.
        </p>
      </div>
    );
  }

  return (
    <div className="h-64 overflow-y-auto pr-1 font-sans text-stone-700 text-sm md:text-base leading-relaxed selection:bg-red-500 selection:text-white animate-fadeIn space-y-4">
      {/* Párrafo de introducción destacado con una tipografía un poco más grande */}
      <p className="font-semibold text-stone-950 text-base md:text-lg tracking-wide border-b border-stone-200 pb-2 mb-2">
        Hola, soy{" "}
        <span className="text-[#8a1c14] font-black">{profile.name}</span>, un
        profesional {profile.title} operando desde {profile.location}.
      </p>

      <p className="text-stone-700 text-xs md:text-sm leading-relaxed text-justify first-letter:text-xl first-letter:font-bold">
        {profile.aboutMe}
      </p>
    </div>
  );
}
