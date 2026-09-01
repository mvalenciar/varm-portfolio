"use client";

import React from "react";

export default function SkillForm() {
  return (
    <form className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Nueva Habilidad Tecnológica
      </h3>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Nombre de la Tecnología
        </label>
        <input
          type="text"
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
          placeholder="Ej: Tailwind v4"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Categoría
        </label>
        <select className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs bg-white focus:border-red-600 focus:outline-none">
          <option value="Frontend">Frontend / Interfaz</option>
          <option value="Backend">Backend / Infraestructura</option>
          <option value="Cybersecurity">Cybersecurity / Defensa</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Nivel de Dominio (1 al 5)
        </label>
        <input
          type="number"
          min={1}
          max={5}
          defaultValue={3}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase py-3 border border-stone-950 transition-all hover:bg-red-650 hover:border-red-650"
      >
        Guardar Habilidad
      </button>
    </form>
  );
}
