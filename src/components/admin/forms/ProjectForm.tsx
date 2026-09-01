"use client";

import React from "react";

export default function ProjectForm() {
  return (
    <form className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Nuevo Proyecto / Obra
      </h3>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Título del Proyecto
        </label>
        <input
          type="text"
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
          placeholder="Ej: Varm Cryptography Lab"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Descripción Técnica
        </label>
        <textarea
          rows={4}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
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
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="https://github.com..."
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            URL del Despliegue (Live)
          </label>
          <input
            type="url"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="https://..."
          />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="isPersonal"
          className="accent-red-600"
          defaultChecked
        />
        <label
          htmlFor="isPersonal"
          className="text-[11px] font-semibold text-stone-700 uppercase tracking-wide"
        >
          ¿Es un Proyecto Personal / Laboratorio?
        </label>
      </div>
      <button
        type="submit"
        className="w-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase py-3 border border-stone-950 transition-all hover:bg-red-650 hover:border-red-650"
      >
        Guardar Proyecto
      </button>
    </form>
  );
}
