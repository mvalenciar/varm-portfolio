"use client";

import React from "react";

export default function ProfileForm() {
  return (
    <form className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Información del Perfil y Contacto
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Nombre Completo
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            defaultValue="Milton Valencia R."
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Título Profesional
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            defaultValue="Full Stack Developer"
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Biografía Principal (Quién Soy)
        </label>
        <textarea
          rows={4}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
          placeholder="Tu narrativa tradicional para el lienzo Washi..."
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Correo Electrónico
          </label>
          <input
            type="email"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="tu-correo@example.com"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Teléfono de Contacto
          </label>
          <input
            type="text"
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none"
            placeholder="+57 3..."
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase py-3 border border-stone-950 transition-all hover:bg-red-650 hover:border-red-650"
      >
        Actualizar Perfil
      </button>
    </form>
  );
}
