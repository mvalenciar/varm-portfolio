import React from "react";

export default function AboutSection() {
  return (
    <div className="space-y-4">
      <p className="leading-relaxed text-stone-700 font-medium font-sans">
        Hola, soy{" "}
        <strong className="text-stone-950">
          Milton Alonso Valencia Rincón
        </strong>
        , un desarrollador web en fase de training operando desde Puerto Asís,
        Putumayo.
      </p>
      <p className="leading-relaxed text-stone-700 font-sans text-sm md:text-base">
        Mi enfoque combina la rigurosidad de la{" "}
        <span className="text-[#8a1c14] font-semibold">
          Ciberseguridad Defensiva
        </span>{" "}
        con la pulcritud de la{" "}
        <span className="text-[#8a1c14] font-semibold">
          Arquitectura Limpia
        </span>
        . Concibo el desarrollo web como un proceso artesanal (Monozukuri),
        buscando que cada línea de código sea mantenible, segura y libre de
        estrés técnico.
      </p>
    </div>
  );
}
