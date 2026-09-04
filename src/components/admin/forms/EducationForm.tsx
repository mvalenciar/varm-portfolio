"use client";

import React from "react";
import useEducationForm from "@/hooks/useEducationForm";

export default function EducationForm() {
  const {
    institution,
    degree,
    periodType,
    description,
    gradYear,
    isPending,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useEducationForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Registrar Formación Académica (学歴)
      </h3>

      {/* Alertas UX/UI */}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Institución / Universidad
          </label>
          <input
            type="text"
            name="institution"
            required
            disabled={isPending}
            value={institution}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="Ej: UNAD, SENA"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Título / Certificación Obtenida
          </label>
          <input
            type="text"
            name="degree"
            required
            disabled={isPending}
            value={degree}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="Ej: Ingeniería de Sistemas"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Nivel de Formación
          </label>
          <select
            name="periodType"
            disabled={isPending}
            value={periodType}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs bg-white focus:border-red-600 focus:outline-none bg-stone-50"
          >
            <option value="Estudio de Postgrado Complementario">
              Postgrado / Especialización
            </option>
            <option value="Pregrado Profesional">
              Pregrado Profesional / Ingeniería
            </option>
            <option value="Educación Superior Técnica">Tecnólogo</option>
            <option value="Educación Superior Técnica Corta">Técnico</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Año de Graduación
          </label>
          <input
            type="number"
            name="gradYear"
            required
            disabled={isPending}
            value={gradYear}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="Ej: 2026"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Resumen / Descripción de Formación
        </label>
        <textarea
          name="description"
          rows={3}
          required
          disabled={isPending}
          value={description}
          onChange={handleChange}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
          placeholder="Describe brevemente el enfoque de la carrera o los logros principales..."
        />
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
          "Guardar Educación"
        )}
      </button>
    </form>
  );
}
