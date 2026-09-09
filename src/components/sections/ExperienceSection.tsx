"use client";

import { usePortfolioAudio } from "@/context/AudioContext";
import { useVisitorExperience } from "@/hooks/useVisitorExperience";

export default function ExperienceSection() {
  const { experiences, isLoading, error } = useVisitorExperience();
  const { playHyoshigiSound } = usePortfolioAudio();

  // Pantalla de carga sutil que respeta la mística del papel
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center font-sans">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-200 border-t-[#8a1c14]" />
      </div>
    );
  }

  // Alerta defensiva si falla el internet en Puerto Asís o Supabase entra en mantenimiento
  if (error) {
    return (
      <div className="p-4 border border-dashed border-red-200 bg-red-50 text-center font-sans animate-fadeIn">
        <p className="text-[10px] font-bold tracking-wider text-red-650 uppercase">
          Mantenimiento de red: Sincronización de trayectoria diferida.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 h-64 overflow-y-auto pr-1 font-sans text-stone-900 antialiased selection:bg-red-500 selection:text-white">
      {experiences.length === 0 ? (
        <p className="text-xs text-stone-400 font-medium text-center py-8 border border-dashed border-stone-200 bg-stone-50/50">
          No hay crónicas laborales registradas en el lienzo relacional.
        </p>
      ) : (
        <div className="space-y-2.5 relative border-l border-stone-300/40 ml-2 pl-3">
          {experiences.map((job, index) => {
            // TRUCO DE DISEÑO: Validamos si es el mismo centro/empresa que el contrato anterior
            const isSameCompany =
              index > 0 && experiences[index - 1].company === job.company;

            return (
              <div
                key={job.id}
                onMouseEnter={playHyoshigiSound} // Sonido del madero tradicional al rozar la tarjeta
                className="group relative p-2.5 bg-[#faf8f5]/40 border border-stone-300/60 rounded-sm hover:bg-white hover:border-stone-400 hover:shadow-[1px_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 animate-[fadeIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${index * 60}ms` }} // Efecto cascada tradicional RPG
              >
                {/* Indicador de nodo temporal en la línea de tiempo */}
                <div className="absolute -left-[16.5px] top-4.5 w-1.5 h-1.5 rounded-full bg-stone-300 group-hover:bg-[#8a1c14] transition-colors duration-350" />

                {/* Encabezado de la Tarjeta */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex flex-col min-w-0 flex-1">
                    {/* Solo muestra la empresa si cambió, optimizando drásticamente el espacio */}
                    {!isSameCompany ? (
                      <span className="text-[8.5px] font-mono tracking-widest text-stone-400 uppercase font-bold truncate">
                        {job.company}
                      </span>
                    ) : (
                      <span className="text-[8.5px] font-mono tracking-wider text-stone-400/60 italic">
                        ↳ Continuidad contractual
                      </span>
                    )}
                    <h4 className="font-serif text-cd font-bold text-stone-900 tracking-wide mt-0.5 leading-snug">
                      {job.role}
                    </h4>
                  </div>

                  {/* Bloque Temporal Ordenable */}
                  <span className="text-[9px] font-mono font-bold tracking-wider text-stone-500 bg-stone-200/40 px-1.5 py-0.5 rounded-sm whitespace-nowrap uppercase">
                    {job.startDate} — {job.endDate || "Presente"}
                  </span>
                </div>

                {/* Descripción del Rol Profesional (Ahora mucho más corta y adaptada) */}
                <p className="text-stone-600 text-[11px] mt-1.5 leading-relaxed text-justify whitespace-pre-line">
                  {job.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
