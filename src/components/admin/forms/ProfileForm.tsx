"use client";

import React from "react";
import { useProfileForm } from "@/hooks/useProfileForm"; // 👈 Tu nuevo hook

export default function ProfileForm() {
  const {
    name,
    title,
    aboutMe,
    email,
    phone,
    location,
    linkedInUrl,
    gitHubUrl,
    cvUrl,
    isPending,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useProfileForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      <h3 className="text-xs font-black tracking-widest text-stone-950 uppercase border-b border-stone-100 pb-2">
        Identidad y Datos de Contacto (プロフィール)
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Nombre Completo
          </label>
          <input
            type="text"
            name="name"
            required
            disabled={isPending}
            value={name}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Título Profesional de Marca
          </label>
          <input
            type="text"
            name="title"
            required
            disabled={isPending}
            value={title}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
          Narrativa / Biografía (Quién Soy)
        </label>
        <textarea
          name="aboutMe"
          rows={4}
          required
          disabled={isPending}
          value={aboutMe}
          onChange={handleChange}
          className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
          placeholder="Escribe aquí tu historia mística para el lienzo de papel Washi..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Email Público
          </label>
          <input
            type="email"
            name="email"
            required
            disabled={isPending}
            value={email}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="correo@example.com"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Teléfono (WhatsApp)
          </label>
          <input
            type="text"
            name="phone"
            disabled={isPending}
            value={phone}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="+57 3..."
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            Ubicación Actual
          </label>
          <input
            type="text"
            name="location"
            required
            disabled={isPending}
            value={location}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            URL LinkedIn
          </label>
          <input
            type="url"
            name="linkedInUrl"
            disabled={isPending}
            value={linkedInUrl}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="https://linkedin.com..."
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold tracking-wider text-stone-400 uppercase">
            URL GitHub
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
            URL Hoja de Vida (CV PDF)
          </label>
          <input
            type="url"
            name="cvUrl"
            disabled={isPending}
            value={cvUrl}
            onChange={handleChange}
            className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50"
            placeholder="Enlace de Drive, Dropbox o Vercel Blob..."
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
          "Actualizar Identidad Profesional"
        )}
      </button>
    </form>
  );
}
