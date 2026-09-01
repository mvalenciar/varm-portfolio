"use client";

import React from "react";
import {
  Users,
  FolderGit2,
  Cpu,
  GraduationCap,
  TrendingUp,
} from "lucide-react";

export default function DashboardMetrics() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 animate-fadeIn">
      {/* Card 1: Visitas Totales */}
      <div className="border border-stone-200 bg-white p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
            Visitas Totales
          </p>
          <h3 className="mt-2 text-2xl font-black text-stone-950">261</h3>
          <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" /> +14% este mes
          </p>
        </div>
        <div className="bg-stone-100 p-3 rounded-sm border border-stone-200 text-stone-700">
          <Users className="h-5 w-5" />
        </div>
      </div>

      {/* Card 2: Proyectos */}
      <div className="border border-stone-200 bg-white p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
            Proyectos
          </p>
          <h3 className="mt-2 text-2xl font-black text-stone-950">0</h3>
          <p className="mt-1 text-[10px] text-stone-500 font-medium">
            PostgreSQL Activo
          </p>
        </div>
        <div className="bg-stone-100 p-3 rounded-sm border border-stone-200 text-stone-700">
          <FolderGit2 className="h-5 w-5" />
        </div>
      </div>

      {/* Card 3: Skills */}
      <div className="border border-stone-200 bg-white p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
            Habilidades (Skills)
          </p>
          <h3 className="mt-2 text-2xl font-black text-stone-950">0</h3>
          <p className="mt-1 text-[10px] text-stone-500 font-medium">
            Clasificadas por nivel
          </p>
        </div>
        <div className="bg-stone-100 p-3 rounded-sm border border-stone-200 text-stone-700">
          <Cpu className="h-5 w-5" />
        </div>
      </div>

      {/* Card 4: Trayectoria */}
      <div className="border border-stone-200 bg-white p-5 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
            Cronología / Educación
          </p>
          <h3 className="mt-2 text-2xl font-black text-stone-950">0</h3>
          <p className="mt-1 text-[10px] text-stone-500 font-medium">
            Registros en historial
          </p>
        </div>
        <div className="bg-stone-100 p-3 rounded-sm border border-stone-200 text-stone-700">
          <GraduationCap className="h-5 w-5" />
        </div>
      </div>
    </section>
  );
}
