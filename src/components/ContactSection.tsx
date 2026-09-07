"use client";

import React from "react";
import { usePortfolioAudio } from "@/context/AudioContext";
import { useVisitorProfile } from "@/hooks/useVisitorProfile";

export default function ContactSection() {
  const { playMokugyoSound, playHyoshigiSound } = usePortfolioAudio();

  // Consumimos las redes y datos de contacto reales desde Supabase
  const { profile, isLoading, error } = useVisitorProfile();

  // Pantalla de carga sutil que respeta la mística zen del papel
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center font-sans">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-[#8a1c14]" />
      </div>
    );
  }

  // Alerta defensiva si falla la red local en Puerto Asís o Supabase entra en mantenimiento
  if (error || !profile) {
    return (
      <div className="p-4 border border-dashed border-red-200 bg-red-50 text-center font-sans animate-fadeIn">
        <p className="text-[10px] font-bold tracking-wider text-red-650 uppercase">
          Canales en modo offline: Escríbeme a tu-correo-manual@example.com
        </p>
      </div>
    );
  }

  // 📦 CONSTRUCCIÓN DINÁMICA DE TUS CANALES VIVOS DESDE LA BASE DE DATOS
  // Filtramos dinámicamente para que solo aparezcan los botones si tú llenaste el campo en el Dashboard
  const canalesVivos = [
    {
      network: "Correo Electrónico",
      data: profile.email,
      action: `mailto:${profile.email}`,
      label: "Email ✉️",
    },
    ...(profile.phone
      ? [
          {
            network: "WhatsApp / Contacto",
            data: profile.phone,
            action: `https://wa.me/57${profile.phone.replace(/[^0-9]/g, "")}`,
            label: "Mensaje 💬",
          },
        ]
      : []),
    ...(profile.linkedInUrl
      ? [
          {
            network: "LinkedIn Professional",
            data: "Milton Valencia R.",
            action: profile.linkedInUrl,
            label: "Perfil 💼",
          },
        ]
      : []),
    ...(profile.gitHubUrl
      ? [
          {
            network: "GitHub Platform",
            data: "@mvalenciar",
            action: profile.gitHubUrl,
            label: "Código 💻",
          },
        ]
      : []),
    ...(profile.cvUrl
      ? [
          {
            network: "Hoja de Vida (Currículum)",
            data: "cv_milton_valencia.pdf",
            action: profile.cvUrl,
            label: "Descargar 📄",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-4 h-64 overflow-y-auto pr-1 font-sans antialiased selection:bg-red-500 selection:text-white animate-fadeIn">
      {/* Texto introductorio honesto purgado de ciberseguridad */}
      <p className="text-stone-700 text-xs md:text-sm leading-relaxed italic mb-4">
        ¿Tienes un proyecto en mente, buscas un perfil Full-Stack riguroso o
        quieres debatir sobre arquitectura limpia y testing automatizado? Mis
        canales están abiertos para la acción.
      </p>

      {/* 📦 LISTA DE ACCESOS DIRECTOS DINÁMICOS */}
      <div className="space-y-4">
        {canalesVivos.map((channel, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-stone-300/60 pb-3 last:border-0 last:pb-0 animate-[fadeIn_0.3s_ease-out_both]"
            style={{ animationDelay: `${index * 50}ms` }} // Mantiene tu hermoso efecto cascada RPG
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                {channel.network}
              </span>
              <span className="text-stone-900 font-medium text-sm mt-0.5 select-all">
                {channel.data}
              </span>
            </div>

            {/* Botón de acción con estilo caligráfico compacto */}
            <a
              href={channel.action}
              target="_blank"
              rel="noopener noreferrer"
              className="font-yuzarsif text-xs tracking-widest text-[#8a1c14] hover:text-stone-950 transition-all duration-300 hover:scale-105 mt-2 sm:mt-0 bg-stone-200/40 hover:bg-stone-200/80 border border-stone-300/60 px-3 py-1.5 rounded-sm shadow-sm text-center cursor-pointer"
              onClick={playMokugyoSound}
              onMouseEnter={playHyoshigiSound}
            >
              {channel.label}
            </a>
          </div>
        ))}
      </div>

      <div className="text-center pt-3 border-t border-dashed border-stone-300/60 mt-5">
        <span className="text-[10px] tracking-[0.2em] text-stone-400 uppercase">
          Puerto Asís, Putumayo 🇨🇴 ➔ Mundo 🌐
        </span>
      </div>
    </div>
  );
}
