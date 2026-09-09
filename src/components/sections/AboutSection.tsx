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

  // 🛡️ RESPALDO DEFENSIVO
  if (error || !profile) {
    return (
      <div className="space-y-4 h-64 overflow-y-auto px-2 pr-2 text-stone-700 text-xs md:text-sm leading-relaxed animate-fadeIn [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-200 [&::-webkit-scrollbar-thumb]:rounded-sm">
        <p className="font-serif font-bold text-stone-950 text-sm md:text-base border-b border-stone-200/60 pb-1.5 mb-2">
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
        <p className="text-justify">
          Concibo el desarrollo web como un proceso artesanal (Monozukuri),
          buscando que cada línea de código sea mantenible, segura y libre de
          estrés técnico.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 h-64 overflow-y-auto px-2 pr-2 font-sans text-stone-900 antialiased selection:bg-red-500 selection:text-white [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-stone-250 hover:[&::-webkit-scrollbar-thumb]:bg-[#8a1c14]/40 [&::-webkit-scrollbar-thumb]:rounded-sm">
      {/* Párrafo de introducción */}
      <p className="font-serif font-bold text-stone-950 text-sm md:text-base tracking-wide border-b border-stone-200/60 pb-1.5 mb-2 leading-snug">
        Hola, soy{" "}
        <span className="text-[#8a1c14] font-black">{profile.name}</span>, un
        profesional {profile.title} operando desde {profile.location}.
      </p>

      {/* Cuerpo del perfil */}
      <p className="text-stone-700 text-xs md:text-sm leading-relaxed text-justify whitespace-pre-line">
        {profile.aboutMe}
      </p>
    </div>
  );
}
