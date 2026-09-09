"use client";

import useWorkExperienceForm from "@/hooks/useWorkExperienceForm";

export default function ExperienceForm() {
  const {
    company,
    role,
    description,
    startDate,
    endDate,
    isPending,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useWorkExperienceForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Registrar Estudio o Empleo
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
            Empresa / Institución
          </label>
          <input
            type="text"
            name="company"
            disabled={isPending}
            onChange={handleChange}
            value={company}
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
            name="role"
            disabled={isPending}
            onChange={handleChange}
            value={role}
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
          name="description"
          disabled={isPending}
          onChange={handleChange}
          value={description}
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
            type="date"
            name="startDate"
            disabled={isPending}
            onChange={handleChange}
            value={startDate}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="Ej: Enero 2025"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Fecha de Finalización
          </label>
          <input
            type="date"
            name="endDate"
            disabled={isPending}
            onChange={handleChange}
            value={endDate}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="Ej: Presente, Diciembre 2026"
          />
        </div>
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
          "Guardar Experiencia"
        )}
      </button>
    </form>
  );
}
