"use client";

import React from "react";
import { useVisitorEducation } from "@/hooks/useVisitorEducation"; // 👈 Tu nuevo hook de lectura pura

export default function EducationSection() {
  // Consumimos el historial académico vivo desde Supabase en una sola línea limpia
  const { educationHistory, isLoading, error } = useVisitorEducation();

  // Pantalla de carga perimetral respetando la mística zen del papel
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center font-sans">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-200 border-t-[#8a1c14]" />
      </div>
    );
  }

  // Alerta defensiva si falla la red local
  if (error) {
    return (
      <div className="p-4 border border-dashed border-red-200 bg-red-50 text-center font-sans">
        <p className="text-[11px] font-bold tracking-wider text-red-600 uppercase">
          Sincronización diferida: No se pudo leer el historial académico.
        </p>
      </div>
    );
  }

  return (
    /* Contenedor con scroll interno sutil */
    <div className="space-y-4 h-64 overflow-y-auto pr-1 font-sans text-stone-900 antialiased selection:bg-red-500 selection:text-white">
      {educationHistory.length === 0 ? (
        <p className="text-xs text-stone-400 font-medium text-center py-8 border border-dashed border-stone-200 bg-stone-50/50">
          No hay hitos académicos registrados en el lienzo relacional.
        </p>
      ) : (
        <div className="relative border-l border-stone-300 pl-4 ml-2 space-y-6">
          {educationHistory.map((hito, index) => (
            <div
              key={hito.id}
              className="relative animate-[fadeIn_0.4s_ease-out_both]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* 🔴 Nodo indicador de la línea de tiempo */}
              <span className="absolute -left-5.25 top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#8a1c14] ring-4 ring-[#faf8f5]" />

              {/* Contenido del hito dinámico */}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase font-semibold">
                  {hito.periodType} — {hito.institution}
                </span>
                <h4 className="font-serif text-base font-bold text-stone-900 tracking-wide mt-0.5">
                  {hito.degree}{" "}
                  <span className="text-xs font-mono text-stone-400 font-normal">
                    ({hito.gradYear})
                  </span>
                </h4>
                <p className="text-stone-700 text-xs md:text-sm mt-1 leading-relaxed">
                  {hito.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
