"use client";

import React from "react";

export default function ExperienceForm() {
  return (
    <form className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Registrar Estudio o Empleo
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Empresa / Institución
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="Ej: Universidad, Empresa X"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Rol / Título Obtenido
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="Ej: Ingeniero de Sistemas, Soporte Técnico"
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Resumen de Logros / Funciones
        </label>
        <textarea
          rows={4}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
          placeholder="Describe brevemente tus responsabilidades..."
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Fecha de Inicio
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="Ej: Enero 2025"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Fecha de Finalización
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="Ej: Presente, Diciembre 2026"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase py-3 border border-stone-950 transition-all hover:bg-red-650 hover:border-red-650"
      >
        Guardar Registro
      </button>
    </form>
  );
}
