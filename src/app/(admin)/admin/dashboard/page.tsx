"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

import { useAdminAuth } from "@/hooks/useAdminAuth";

// 🏢 IMPORTACIÓN DE COMPONENTES DE ANALÍTICAS MODULARES
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import TrafficChart from "@/components/admin/TrafficChart";

// 🛠️ IMPORTACIÓN DE FORMULARIOS CRUD INDEPENDIENTES
import ExperienceForm from "@/components/admin/forms/ExperienceForm";
import ProfileForm from "@/components/admin/forms/ProfileForm";
import ProjectForm from "@/components/admin/forms/ProjectForm";
import SkillForm from "@/components/admin/forms/SkillForm";
import LoginForm from "@/components/admin/LoginForm";

type MainTabType = "metrics" | "forms";
type SubFormType = "projects" | "skills" | "experience" | "profile";

export default function AdminDashboard() {
  const {
    session,
    loading,
    isSubmitting,
    isLoggingOut,
    email,
    password,
    authError,
    setField,
    handleLogin,
    handleLogout,
  } = useAdminAuth();

  const [activeTab, setActiveTab] = useState<MainTabType>("metrics");
  const [subForm, setSubForm] = useState<SubFormType>("projects");

  // Barrera de carga para evitar parpadeos
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-red-650" />
      </div>
    );
  }

  // Si no hay inicio de sesión, se muestra el formulario de inicio de sesión
  if (!session) {
    return (
      <LoginForm
        email={email}
        password={password}
        authError={authError}
        isSubmitting={isSubmitting}
        setField={setField}
        handleLogin={handleLogin}
      />
    );
  }

  // Si hay sesión
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased selection:bg-red-500 selection:text-white">
      {/* 🇯🇵 HEADER / BARRA SUPERIOR (MINIMALIST HINOMARU STYLE) */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
            <h1 className="text-sm font-bold tracking-[0.25em] uppercase text-stone-950">
              VARM // CONTROL PANEL
            </h1>
          </div>
          <button
            className="flex items-center gap-2 border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase text-stone-700 transition-all hover:bg-stone-950 hover:text-white"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-stone-700 border-t-transparent" />
            ) : (
              <LogOut className="h-3.5 w-3.5" />
            )}
            Salir
          </button>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {/* NAVEGACIÓN DE PESTAÑAS PRINCIPALES */}
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

        {/* CONTENIDO INTERCAMBIABLE SEGÚN PESTAÑA */}
        {activeTab === "metrics" ? (
          <div className="space-y-8">
            {/* Llama a las tarjetas de contadores rápidos */}
            <DashboardMetrics />
            {/* Llama al gráfico responsivo de Recharts */}
            <TrafficChart />
          </div>
        ) : (
          <div className="space-y-8 animate-fadeIn">
            {/* SUB-NAVEGACIÓN INTERNA DE FORMULARIOS INDEPENDIENTES */}
            <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-4">
              {(
                ["projects", "skills", "experience", "profile"] as SubFormType[]
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubForm(tab)}
                  className={`border px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-all ${
                    subForm === tab
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-stone-300 bg-white text-stone-700 hover:border-stone-950 hover:bg-stone-50"
                  }`}
                >
                  {tab === "projects" && "💻 Proyectos"}
                  {tab === "skills" && "🛠️ Habilidades"}
                  {tab === "experience" && "🏢 Trayectoria"}
                  {tab === "profile" && "👤 Perfil y Contacto"}
                </button>
              ))}
            </div>

            {/* SECCIÓN DONDE SE INYECTA EL COMPONENTE DE FORMULARIO INDEPENDIENTE */}
            <div className="border border-stone-200 bg-white p-6 shadow-sm max-w-2xl mx-auto">
              {subForm === "projects" && <ProjectForm />}
              {subForm === "skills" && <SkillForm />}
              {subForm === "experience" && <ExperienceForm />}
              {subForm === "profile" && <ProfileForm />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
