import React, { useState } from "react";

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const allProjects = [
    {
      id: 1,
      titulo: "🦸 Heroes App (Frontend)",
      descripcion:
        "Aplicación interactiva para explorar personajes, estadísticas y guardar favoritos. Diseñada bajo Feature-Driven Architecture y principios SOLID.",
      stack: ["React", "TypeScript", "Vite", "Shadcn/UI", "Vitest", "RTL"],
    },
    {
      id: 2,
      titulo: "🛡️ Auth & Mailer System (Full-Stack)",
      descripcion:
        "Arquitectura desacoplada con backend seguro en Render. Incluye hashing de contraseñas, validación estricta de esquemas y envío de correos.",
      stack: [
        "Node.js",
        "Express",
        "Prisma",
        "Supertest",
        "Bcrypt",
        "Nodemailer",
      ],
    },
    {
      id: 3,
      titulo: "🌸 Zen CMS Portfolio (Next.js)",
      descripcion:
        "Este portafolio. Una experiencia inmersiva con renderizado híbrido (SSR/Client) y optimización nativa de recursos.",
      stack: ["Next.js 16.3", "React 19", "Tailwind v4", "GSAP", "TypeScript"],
    },
  ];

  const projectsPerPage = 2;
  const totalPages = Math.max(
    1,
    Math.ceil(allProjects.length / projectsPerPage),
  );
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = projectsPerPage * currentPage;
  const visibleProjects = allProjects.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col justify-between font-sans space-y-4 h-64 overflow-y-auto pr-1">
      {/* 📦 LISTA DE PROYECTOS VISIBLES */}
      <div className="h-full">
        {visibleProjects.map((project) => (
          <div
            key={project.id}
            className="border-b border-stone-300/60 pb-4 last:border-0 last:pb-0 animate-[fadeIn_0.4s_ease-out_both]"
          >
            <h4 className="font-serif text-base font-bold text-stone-900 tracking-wide">
              {project.titulo}
            </h4>
            <p className="text-stone-700 text-xs md:text-sm mt-1 leading-relaxed">
              {project.descripcion}
            </p>

            {/* Etiquetas de tecnologías */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {project.stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium px-2 py-0.5 bg-stone-200/60 border border-stone-300/40 rounded-sm text-stone-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🕹️ CONTROLADOR DE PAGINACIÓN ESTILO RPG */}
      <div className="flex justify-between items-center border-t border-dashed border-stone-300/60 pt-4 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="font-yuzarsif text-sm tracking-widest text-stone-500 hover:text-stone-950 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all hover:scale-105"
        >
          ◀ ANTERIOR
        </button>

        <span className="font-serif text-xs text-stone-500 tracking-widest">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="font-yuzarsif text-sm tracking-widest text-stone-500 hover:text-stone-950 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all hover:scale-105"
        >
          SIGUIENTE ▶
        </button>
      </div>
    </div>
  );
}
