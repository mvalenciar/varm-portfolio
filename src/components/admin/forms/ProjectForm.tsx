"use client";

import React from "react";
import { useProjectForm } from "@/hooks/useProjectForm";

export default function ProjectForm() {
  const {
    title,
    description,
    gitHubUrl,
    liveUrl,
    isPersonal,
    availableSkills,
    selectedSkillsIds,
    isPending,
    successMessage,
    errorMessage,
    handleChange,
    handleSkillToggle,
    handleSubmit,
  } = useProjectForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Nuevo Proyecto / Obra
      </h3>

      {successMessage && (
        <p className="text-[10px] font-bold tracking-wider text-emerald-600 uppercase bg-emerald-50 p-2 border border-emerald-200">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-[10px] font-bold tracking-wider text-red-600 uppercase bg-red-50 p-2 border border-red-200">
          {errorMessage}
        </p>
      )}

      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Título del Proyecto
        </label>
        <input
          type="text"
          name="title"
          required
          disabled={isPending}
          value={title}
          onChange={handleChange}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
          placeholder="Ej: Varm Cryptography Lab"
        />
      </div>

      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Descripción Técnica
        </label>
        <textarea
          name="description"
          rows={3}
          required
          disabled={isPending}
          value={description}
          onChange={handleChange}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
          placeholder="Explica la arquitectura y las tecnologías utilizadas..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            URL de GitHub
          </label>
          <input
            type="url"
            name="gitHubUrl"
            disabled={isPending}
            value={gitHubUrl}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="https://github.com..."
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            URL del Despliegue (Live)
          </label>
          <input
            type="url"
            name="liveUrl"
            disabled={isPending}
            value={liveUrl}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* 🛠️ REJILLA DE SELECCIÓN DE SKILLS (TECNOLOGÍAS DEL PROYECTO) */}
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase mb-3">
          Tecnologías Utilizadas (Stack)
        </label>

        {availableSkills.length === 0 ? (
          <p className="text-[10px] text-stone-400 font-medium bg-stone-50 p-2 border border-dashed border-stone-200">
            Primero debes registrar habilidades en la pestaña 🛠️ Habilidades
            para enlazarlas aquí.
          </p>
        ) : (
          <div className="border border-stone-200 p-4 bg-stone-50 space-y-4 max-h-60 overflow-y-auto">
            {["Frontend", "Backend", "QA"].map((categoryGroup) => {
              const filteredSkills = availableSkills.filter(
                (skill) => skill.category === categoryGroup,
              );

              if (filteredSkills.length === 0) return null;

              return (
                <div key={categoryGroup} className="space-y-2">
                  <h4 className="text-[9px] font-black tracking-widest text-stone-400 uppercase border-b border-stone-250 pb-1">
                    {categoryGroup === "Cybersecurity"
                      ? "🛡️ Cybersecurity / QA"
                      : `⚡ ${categoryGroup}`}
                  </h4>

                  {/* Rejilla de dos columnas exclusiva para las tecnologías de este grupo */}
                  <div className="grid grid-cols-2 gap-2 pl-1">
                    {filteredSkills.map((skill) => (
                      <label
                        key={skill.id}
                        className="flex items-center gap-2 text-[11px] font-medium text-stone-700 uppercase tracking-wide cursor-pointer select-none hover:text-stone-950 transition-colors"
                      >
                        <input
                          type="checkbox"
                          disabled={isPending}
                          checked={selectedSkillsIds.includes(skill.id)}
                          onChange={() => handleSkillToggle(skill.id)}
                          className="accent-red-600 h-3.5 w-3.5 border-stone-300 cursor-pointer"
                        />
                        {skill.name}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          name="isPersonal"
          id="isPersonal"
          disabled={isPending}
          checked={isPersonal}
          onChange={handleChange}
          className="accent-red-600 h-4 w-4"
        />
        <label
          htmlFor="isPersonal"
          className="text-[11px] font-semibold text-stone-700 uppercase tracking-wide cursor-pointer select-none"
        >
          ¿Es un Proyecto Personal / Laboratorio?
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase py-3 border border-stone-950 transition-all hover:bg-red-650 hover:border-red-650 disabled:bg-stone-400 disabled:border-stone-400 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Guardando...
          </>
        ) : (
          "Guardar Proyecto"
        )}
      </button>
    </form>
  );
}
