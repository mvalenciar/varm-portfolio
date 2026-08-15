import React from "react";

export default function PapperContainer() {
  return (
    <div
      className="relative max-w-lg mx-auto my-10 p-8 
            bg-[#faf8f5] 
            border border-[#d7c9be]/60
            rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
            shadow-[2px_5px_15px_rgba(0,0,0,0.05),inset_0_0_20px_rgba(240,235,225,0.5)]
            overflow-hidden"
    >
      <div className="font-serif text-[#2b2b2b] leading-relaxed">
        <h2 className="mt-0 text-xl font-bold text-[#8a1c14] border-b border-dashed border-[#8a1c14]/30 pb-2 mb-4">
          和紙
        </h2>
        <p className="text-sm md:text-base">
          Este es un contenedor desarrollado con Tailwind CSS que simula la
          textura y el estilo del papel tradicional japonés. Tiene bordes
          ligeramente irregulares, colores cálidos de papiro y una sombra
          delicada para darle profundidad.
        </p>
      </div>
    </div>
  );
}
