"use client";

import useSkillForm from "@/hooks/useSkillForm";
import React from "react";

export default function SkillForm() {
  const {
    name,
    category,
    level,
    isPending,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useSkillForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Nueva Habilidad Tecnológica
      </h3>
      {/* Alertas de Éxito o Error de Red UX/UI */}
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
          Nombre de la Tecnología
        </label>
        <input
          type="text"
          name="name"
          required
          disabled={isPending}
          value={name}
          onChange={handleChange}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
          placeholder="Ej: Tailwind v4"
        />
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Categoría
        </label>
        <select
          name="category"
          disabled={isPending}
          value={category}
          onChange={handleChange}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs bg-white focus:border-red-600 focus:outline-none"
        >
          <option value="Frontend">Frontend / Interfaz</option>
          <option value="Backend">Backend / Infraestructura</option>
          <option value="QA">QA / Calidad</option>
        </select>
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Nivel de Dominio (1 al 5)
        </label>
        <input
          type="number"
          name="level"
          min={1}
          max={5}
          disabled={isPending}
          value={level}
          onChange={handleChange}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase py-3 border border-stone-950 transition-all hover:bg-red-650 hover:border-red-650 disabled:bg-stone-400 disabled:border-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Guardando...
          </>
        ) : (
          "Guardar Habilidad"
        )}
      </button>
    </form>
  );
}
