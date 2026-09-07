"use client";

import { useState } from "react";
import { usePortfolioAudio } from "@/context/AudioContext";
import { useVisitorProjects } from "@/hooks/useVisitorProjects";
import { usePagination } from "@/hooks/usePagination";
import PaginationController from "../PaginationController";
import { GitBranch, ExternalLink } from "lucide-react";

export default function ProjectsSection() {
  const [currentPage, setCurrentPage] = useState(1);

  const { projects, isLoading, error } = useVisitorProjects();

  const { totalPages, visibleProjects } = usePagination(projects, currentPage);

  const { playHyoshigiSound, playMokugyoSound } = usePortfolioAudio();

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center font-sans">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-[#8a1c14]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-dashed border-red-200 bg-red-50 text-center font-sans">
        <p className="text-[11px] font-bold tracking-wider text-red-600 uppercase">
          Mantenimiento de red: No se pudieron sincronizar los proyectos.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between font-sans space-y-4 h-64 overflow-y-auto pr-1 selection:bg-red-500 selection:text-white">
      {/* 📦 LISTA DE PROYECTOS VISIBLES */}
      <div className="h-full">
        {visibleProjects.map((project) => (
          <div
            key={project.title}
            className="border-b border-stone-300/60 pb-4 last:border-0 last:pb-0 animate-[fadeIn_0.4s_ease-out_both] flex flex-col justify-between"
          >
            <div>
              <h4 className="font-serif text-base font-bold text-stone-900 tracking-wide">
                {project.title}
              </h4>
              <p className="text-stone-700 text-xs md:text-sm mt-1 leading-relaxed">
                {project.description}
              </p>

              {/* 🕹️ ENLACES OPERACIONALES (GITHUB Y LIVE URL CONDICIONALES) */}
              <div className="flex gap-4 mt-3">
                {project.gitHubUrl && (
                  <a
                    href={project.gitHubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHyoshigiSound}
                    onClick={playMokugyoSound}
                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-stone-500 hover:text-stone-950 uppercase transition-all hover:scale-105 cursor-pointer"
                  >
                    <GitBranch className="h-3.5 w-3.5" /> Código Fuente
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHyoshigiSound}
                    onClick={playMokugyoSound}
                    className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-[#8a1c14] hover:text-red-700 uppercase transition-all hover:scale-105 cursor-pointer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Despliegue En Vivo
                  </a>
                )}
              </div>
            </div>

            {/* Etiquetas de tecnologías (Stack) */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="text-[10px] font-mono font-medium px-2 py-0.5 bg-stone-200/60 border border-stone-300/40 rounded-sm text-stone-600"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CONTROLADOR DE PAGINACIÓN */}
      <PaginationController
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        playMokugyoSound={playMokugyoSound}
        playHyoshigiSound={playHyoshigiSound}
      />
    </div>
  );
}
