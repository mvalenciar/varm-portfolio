import React from "react";

export default function EducationSection() {
  // Tu historial real estructurado como hitos de formación
  const hitosEducativos = [
    {
      period: "Pregrado Professional",
      institution: "UNAD (Univ. Nacional Abierta y a Distancia)",
      title: "🎓 Ingeniería de Sistemas",
      description:
        "Formación integral en ingeniería de software, arquitectura de sistemas, bases de datos y gestión de proyectos tecnológicos.",
    },
    {
      period: "Estudio de Postgrado Complementario",
      institution: "Experto Universitario (Online)",
      title: "🛡️ Fundamentos de Programación y Estructuras en C",
      description:
        "Análisis teórico de algoritmos, gestión de punteros y memoria a bajo nivel. Enfoque útil para comprender el origen de vulnerabilidades arquitectónicas.",
    },
    {
      period: "Educación Superior Técnica",
      institution: "SENA (Servicio Nacional de Aprendizaje)",
      title: "💻 Tecnólogo en Análisis y Desarrollo de Sistemas de Información",
      description:
        "Inmersión práctica en el ciclo de vida del software, desarrollo lógico, maquetación y construcción de aplicaciones del mundo real.",
    },
  ];

  return (
    // Contenedor con scroll interno sutil por si en el futuro sigues sumando certificaciones
    <div className="space-y-6 max-h-[300px] overflow-y-auto pr-1 font-sans">
      <div className="relative border-l border-stone-300 pl-4 ml-2 space-y-6">
        {hitosEducativos.map((hito, index) => (
          <div
            key={index}
            className="relative animate-[fadeIn_0.4s_exe-out_both]"
            style={{ animationDelay: `${index * 100}ms` }} // Efecto cascada tradicional
          >
            {/* 🔴 Nodo indicador de la línea de tiempo: Un punto carmesí tradicional */}
            <span className="absolute -left-[21px] top-1.5 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#8a1c14] ring-4 ring-[#faf8f5]" />

            {/* Contenido del hito */}
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono tracking-wider text-stone-500 uppercase font-semibold">
                {hito.period} — {hito.institution}
              </span>
              <h4 className="font-serif text-base font-bold text-stone-900 tracking-wide mt-0.5">
                {hito.title}
              </h4>
              <p className="text-stone-700 text-xs md:text-sm mt-1 leading-relaxed">
                {hito.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
