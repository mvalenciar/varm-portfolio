import { CHANNELS_CONTACT } from "@/lib/Constant";
import React from "react";

export default function ContactSection() {
  return (
    <div className="space-y-5 font-sans animate-[fadeIn_0.4s_ease-out_both]">
      <p className="text-stone-700 text-xs md:text-sm leading-relaxed italic mb-4">
        ¿Tienes un proyecto en mente, buscas un perfil Full-Stack riguroso o
        quieres debatir sobre ciberseguridad defensiva? Mis canales están
        abiertos para la acción.
      </p>

      {/* 📦 LISTA DE ACCESOS DIRECTOS */}
      <div className="space-y-4">
        {CHANNELS_CONTACT.map((channel, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-stone-300/60 pb-3 last:border-0 last:pb-0"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
                {channel.socialNetwork}
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
              className="font-yuzarsif text-xs tracking-widest text-[#8a1c14] hover:text-stone-950 transition-all duration-300 hover:scale-105 mt-2 sm:mt-0 bg-stone-200/40 hover:bg-stone-200/80 border border-stone-300/60 px-3 py-1.5 rounded-sm shadow-sm text-center"
            >
              {channel.labelButton}
            </a>
          </div>
        ))}
      </div>

      {/* Pie sutil del pergamino */}
      <div className="text-center pt-3 border-t border-dashed border-stone-300/60 mt-5">
        <span className="text-[10px] tracking-[0.2em] text-stone-400 uppercase">
          Puerto Asís, Putumayo 🇨🇴 ➔ Mundo 🌐
        </span>
      </div>
    </div>
  );
}
