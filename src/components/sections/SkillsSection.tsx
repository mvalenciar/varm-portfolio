"use client"; // 📱 Usamos estado para alternar entre las categorías de habilidades

import React, { useState } from "react";
import { usePortfolioAudio } from "@/context/AudioContext";
import useVisitorSkills from "@/hooks/useVisitorSkills"; // 👈 Tu hook purificado
import {
  SkillTabOption,
  SkillTypeCategory,
} from "@/interfaces/skills.interface";

export default function SkillsSection() {
  // Consumimos los arrays de strings vivos directamente desde Supabase
  const { frontSkills, backSkills, qaSkills, isLoading, error } =
    useVisitorSkills();

  // 1. Estado para saber qué categoría de habilidades está mirando el usuario
  const [activeCategory, setActiveCategory] =
    useState<SkillTypeCategory>("front");

  // Tus categorías estructuradas como "Inventario RPG"
  const tabs: SkillTabOption[] = [
    { id: "front", label: "Front // 開発" },
    { id: "back", label: "Back // 基盤" },
    { id: "qa", label: "QA // 品質" },
  ];

  const skillsBD: Record<SkillTypeCategory, string[]> = {
    front: frontSkills,
    back: backSkills,
    qa: qaSkills,
  };

  const skillsVisible = skillsBD[activeCategory] || [];
  const { playMokugyoSound } = usePortfolioAudio();

  // Pantalla de carga perimetral respetando tu mística zen
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center font-sans">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-stone-300 border-t-[#8a1c14]" />
      </div>
    );
  }

  // Alerta defensiva si falla el internet en Puerto Asís o Supabase entra en mantenimiento
  if (error) {
    return (
      <div className="p-4 border border-dashed border-red-200 bg-red-50 text-center font-sans">
        <p className="text-[11px] font-bold tracking-wider text-red-600 uppercase">
          Mantenimiento de red: No se pudieron sincronizar las habilidades.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-sans justify-between h-64 overflow-y-auto pr-1">
      <div>
        {/* 🕹️ MENÚ DE PESTAÑAS HORIZONTALES (ESTILO SELECCIÓN RPG) */}
        <div className="flex justify-around border-b border-stone-350 pb-2 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                playMokugyoSound();
              }}
              className={`font-yuzarsif text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer origin-center ${
                activeCategory === tab.id
                  ? "text-[#8a1c14] font-bold scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🌸 REJILLA DE HABILIDADES DINÁMICAS (CONECTADAS VIVAS A SUPABASE) */}
        <div className="grid grid-cols-2 gap-2 max-h-55 overflow-y-auto pr-1">
          {skillsVisible.map((skill, index) => (
            <div
              key={index}
              /* Mantiene tu hermoso efecto cascada intacto utilizando tu condicional de index */
              className="flex items-center gap-2 px-3 py-2 bg-[#faf8f5]/40 border border-stone-300 text-stone-800 text-xs font-medium rounded-sm shadow-[1px_1px_2px_rgba(0,0,0,0.01)] animate-[fadeIn_0.3s_ease-out_both]"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <span className="text-[#8a1c14]/60 text-[10px]">🔸</span>
              <span className="truncate">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PIE DE PÁGINA DEL PAPEL WASHI */}
      <div className="text-right border-t border-dashed border-stone-300/60 pt-3 mt-4">
        <span className="font-serif text-[10px] text-stone-400 tracking-widest uppercase">
          Evolución Continua // 技術の蓄積
        </span>
      </div>
    </div>
  );
}
