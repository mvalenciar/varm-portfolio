"use client";

import {
  Cpu,
  FolderGit2,
  GraduationCap,
  LogOut,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// 📊 Datos estáticos simulados para la maquetación inicial de la gráfica de visitas
const mockTrafficData = [
  { name: "Lun", visitas: 12 },
  { name: "Mar", visitas: 19 },
  { name: "Mié", visitas: 32 },
  { name: "Jue", visitas: 54 },
  { name: "Vie", visitas: 45 },
  { name: "Sáb", visitas: 23 },
  { name: "Dom", visitas: 38 },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"metrics" | "forms">("metrics");

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased selection:bg-red-500 selection:text-white">
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            {/* El punto rojo sutil que evoca el sol naciente / bandera japonesa */}
            <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
            <h1 className="text-sm font-bold tracking-[0.25em] uppercase text-stone-950">
              VARM // CONTROL PANEL
            </h1>
          </div>
          <button className="flex items-center gap-2 border border-stone-350 bg-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase text-stone-700 transition-all hover:bg-stone-950 hover:text-white">
            <LogOut className="h-3.5 w-3.5" />
            Salir
          </button>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* NAVEGACIÓN INTERNA DEL DASHBOARD */}
        <div className="mb-8 flex gap-4 border-b border-stone-200">
          <button
            onClick={() => setActiveTab("metrics")}
            className={`pb-3 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${
              activeTab === "metrics"
                ? "border-red-600 text-stone-950"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            Métricas y Resumen
          </button>
          <button
            onClick={() => setActiveTab("forms")}
            className={`pb-3 text-xs font-bold tracking-widest uppercase transition-all border-b-2 ${
              activeTab === "forms"
                ? "border-red-600 text-stone-950"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            Gestión de Datos (CRUD)
          </button>
        </div>

        {activeTab === "metrics" ? (
          <div className="space-y-8 animate-fadeIn">
            {/* 📈 SECCIÓN A: CONTADORES RÁPIDOS (ANALYTICS & INFRASTRUCTURE) */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Card 1: Visitas Totales */}
              <div className="border border-stone-200 bg-white p-5 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    Visitas Totales
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-stone-950">
                    261
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                    <TrendingUp className="h-3 w-3" /> +14% este mes
                  </p>
                </div>
                <div className="bg-stone-100 p-3 rounded-sm border border-stone-200 text-stone-700">
                  <Users className="h-5 w-5" />
                </div>
              </div>

              {/* Card 2: Proyectos en DB */}
              <div className="border border-stone-200 bg-white p-5 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    Proyectos registrados
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

              {/* Card 3: Skills en DB */}
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

              {/* Card 4: Estudios/Experiencia */}
              <div className="border border-stone-200 bg-white p-5 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                    Cronología / Educación
                  </p>
                  <h3 className="mt-2 text-2xl font-black text-stone-950">0</h3>
                  <p className="mt-1 text-[10px] text-stone-500 font-medium">
                    Registros en el historial
                  </p>
                </div>
                <div className="bg-stone-100 p-3 rounded-sm border border-stone-200 text-stone-700">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>
            </section>

            {/* 📊 SECCIÓN B: GRÁFICA DE ANALÍTICAS AVANZADA */}
            {/* 📊 SECCIÓN B: GRÁFICA DE ANALÍTICAS AVANZADA (CALIBRADA RESPONSIVA) */}
            <section className="border border-stone-200 bg-white p-4 md:p-6 shadow-sm overflow-hidden w-full">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xs font-bold tracking-widest uppercase text-stone-950">
                    Tráfico del Portafolio
                  </h2>
                  <p className="text-[10px] font-medium text-stone-500 mt-0.5">
                    Visitas únicas por día de la semana actual
                  </p>
                </div>
                <div className="w-fit border border-stone-300 rounded-sm bg-stone-50 px-2 py-1 text-[10px] font-bold tracking-wider uppercase text-stone-600">
                  Últimos 7 Días
                </div>
              </div>

              {/* Contenedor responsivo calibrado: le damos min-w-0 para que Next.js no fuerce anchos estáticos */}
              <div className="h-64 sm:h-72 w-full text-[10px] sm:text-xs min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockTrafficData}
                    margin={{ top: 10, right: 20, left: -25, bottom: 5 }} // Calibramos los márgenes internos de Recharts
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0eded" />
                    <XAxis
                      dataKey="name"
                      stroke="#78716c"
                      tickLine={false}
                      dy={10}
                    />
                    <YAxis stroke="#78716c" tickLine={false} dx={5} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e7e5e4",
                        borderRadius: "2px",
                      }}
                      labelStyle={{ fontWeight: "bold", color: "#1c1917" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="visitas"
                      stroke="#dc2626"
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      dot={{
                        r: 4,
                        stroke: "#dc2626",
                        strokeWidth: 1,
                        fill: "#fff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        ) : (
          /* 🛠️ CASILLA TEMPORAL PARA FORMULARIOS (LA MAQUETAREMOS EN EL SIGUIENTE PASO) */
          <div className="border border-stone-200 bg-white p-12 text-center shadow-sm animate-fadeIn">
            <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
              Aquí inyectaremos los formularios dinámicos minimalistas para
              Proyectos, Skills y Experiencias en el siguiente bloque.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
