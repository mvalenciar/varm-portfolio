"use client"; // 📱 Usamos estado para alternar entre las categorías de habilidades

import {
  InventorySkills,
  SkillTabOption,
  SkillTypeCategory,
} from "@/interfaces/skills.interface";
import React, { useState } from "react";

export default function SkillsSection() {
  // 1. Estado para saber qué categoría de habilidades está mirando el usuario
  const [categoriaActiva, setCategoriaActiva] =
    useState<SkillTypeCategory>("front");

  // Tus categorías estructuradas como "Inventario RPG"
  const pestañas: SkillTabOption[] = [
    { id: "front", label: "Front // 開発" },
    { id: "back", label: "Back // 基盤" },
    { id: "qa", label: "QA // 品質" },
  ];

  // 📦 Tu inventario de habilidades actual (Preparado para que le sumes Python, PHP o Astro)
  const habilidadesBD: InventorySkills = {
    front: [
      "React",
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Vite",
      "Shadcn/UI",
      "HTML5 / CSS3",
      "JavaScript (ES6)",
      // 📝 En el futuro aquí meterás: "Astro", "Vue", etc.
    ],
    back: [
      "Node.js",
      "Express",
      "Prisma ORM",
      "Bcrypt (Security)",
      "Nodemailer",
      "SQL (PostgreSQL / SQLite)",
      "REST APIs",
      // 📝 En el futuro aquí meterás: "Python", "Django", "PHP", "Laravel"
    ],
    qa: [
      "Vitest (Unit Testing)",
      "React Testing Library",
      "Supertest (API Testing)",
      "Factory Pattern Mocks",
      "ESLint & Code Quality",
      "CI/CD Git Flow",
    ],
  };

  // Capturamos el arreglo de habilidades según la pestaña activa utilizando su llave ("front", "back" o "qa")
  const habilidadesVisibles = habilidadesBD[categoriaActiva] || [];

  return (
    <div className="flex flex-col font-sans justify-between h-64 overflow-y-auto pr-1">
      <div>
        {/* 🕹️ MENÚ DE PESTAÑAS HORIZONTALES (ESTILO SELECCIÓN RPG) */}
        <div className="flex justify-around border-b border-stone-350 pb-2 mb-5">
          {pestañas.map((pestaña) => (
            <button
              key={pestaña.id}
              onClick={() => setCategoriaActiva(pestaña.id)}
              className={`font-yuzarsif text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer origin-center ${
                categoriaActiva === pestaña.id
                  ? "text-[#8a1c14] font-bold scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {pestaña.label}
            </button>
          ))}
        </div>

        {/* 🌸 REJILLA DE HABILIDADES DINÁMICAS */}
        {/* Usamos grid con auto-rows para que si agregas más tecnologías, el diseño se acomode solo */}
        <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
          {habilidadesVisibles.map((skill, index) => (
            <div
              key={index}
              /* Efecto fade-in controlado para que cuando cambies de pestaña se sienta fluido */
              className="flex items-center gap-2 px-3 py-2 bg-[#faf8f5]/40 border border-stone-300 text-stone-800 text-xs font-medium rounded-sm shadow-[1px_1px_2px_rgba(0,0,0,0.01)] animate-[fadeIn_0.3s_ease-out_both]"
              style={{ animationDelay: `${index * 40}ms` }} // ✨ Efecto cascada: cada tarjeta sale un milisegundo después
            >
              {/* Un pequeño detalle tradicional como viñeta */}
              <span className="text-[#8a1c14]/60 text-[10px]">🔸</span>
              <span className="truncate">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PIE DE PÁGINA DEL PAPEL WASHI (Informativo sutil) */}
      <div className="text-right border-t border-dashed border-stone-300/60 pt-3 mt-4">
        <span className="font-serif text-[10px] text-stone-400 tracking-widest uppercase">
          Evolución Continua // 技術の蓄積
        </span>
      </div>
    </div>
  );
}
