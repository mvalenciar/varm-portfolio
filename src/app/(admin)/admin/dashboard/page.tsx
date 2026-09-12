"use client";

import React, { useState } from "react";
import { LogOut } from "lucide-react";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import LoginForm from "@/components/admin/LoginForm";
import DashboardMetrics from "@/components/admin/DashboardMetrics";
import TrafficChart from "@/components/admin/TrafficChart";

import ExperienceForm from "@/components/admin/forms/ExperienceForm";
import ProfileForm from "@/components/admin/forms/ProfileForm";
import ProjectForm from "@/components/admin/forms/ProjectForm";
import SkillForm from "@/components/admin/forms/SkillForm";
import EducationForm from "@/components/admin/forms/EducationForm";
import { useAdminMetrics } from "@/hooks/useAdminMetrics";

type MainTabType = "metrics" | "forms";
type SubFormType =
  | "projects"
  | "skills"
  | "experience"
  | "profile"
  | "education";

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

  const { trafficData } = useAdminMetrics();

  const [activeTab, setActiveTab] = useState<MainTabType>("metrics");
  const [subForm, setSubForm] = useState<SubFormType>("projects");

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-stone-300 border-t-red-650" />
      </div>
    );
  }

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

  // 🟢 CASO CONCEDIDO: Ajuste elástico de pantalla senior
  return (
    // Con Con `h-screen` y `overflow-hidden` congelamos el Dashboard al alto exacto del monitor
    <div className="h-screen max-h-screen overflow-hidden bg-stone-50 font-sans text-stone-900 antialiased flex flex-col selection:bg-red-500 selection:text-white">
      {/* 1. HEADER FIJO EN LA CIMA */}
      <header className="flex-none border-b border-stone-200 bg-white px-6 py-4 shadow-sm z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
            <h1 className="text-sm font-bold tracking-[0.25em] uppercase text-stone-950">
              VARM // CONTROL PANEL
            </h1>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase text-stone-700 transition-all hover:bg-stone-950 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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

      {/* 2. CONTENEDOR PRINCIPAL CON SCROLL INTERNO INDEPENDIENTE */}
      {/* Con `flex-1` toma el resto del espacio y con `overflow-y-auto` se auto-regula */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-6 max-w-7xl w-full mx-auto">
        {/* NAVEGACIÓN DE PESTAÑAS PRINCIPALES */}
        <div className="mb-6 flex gap-4 border-b border-stone-200 top-0 bg-stone-50 pt-2 pb-3 z-40">
          <button
            onClick={() => setActiveTab("metrics")}
            className={`pb-1 text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer ${
              activeTab === "metrics"
                ? "border-red-600 text-stone-950"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            Métricas y Resumen
          </button>
          <button
            onClick={() => setActiveTab("forms")}
            className={`pb-1 text-xs font-bold tracking-widest uppercase transition-all border-b-2 cursor-pointer ${
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
          <div className="space-y-6 pb-8">
            <DashboardMetrics />
            <TrafficChart data={trafficData} />
          </div>
        ) : (
          <div className="space-y-6 pb-8 animate-fadeIn">
            {/* SUB-NAVEGACIÓN INTERNA DE FORMULARIOS INDEPENDIENTES */}
            <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-3">
              {(
                [
                  "projects",
                  "skills",
                  "experience",
                  "education",
                  "profile",
                ] as SubFormType[]
              ).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSubForm(tab)}
                  className={`border px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    subForm === tab
                      ? "border-red-600 bg-red-600 text-white"
                      : "border-stone-300 bg-white text-stone-700 hover:border-stone-950 hover:bg-stone-50"
                  }`}
                >
                  {tab === "projects" && "💻 Proyectos"}
                  {tab === "skills" && "🛠️ Habilidades"}
                  {tab === "experience" && "🏢 Trayectoria"}
                  {tab === "education" && "🎓 Educación"}
                  {tab === "profile" && "👤 Perfil y Contacto"}
                </button>
              ))}
            </div>

            {/* SECCIÓN DONDE SE INYECTA EL COMPONENTE DE FORMULARIO */}
            <div className="border border-stone-200 bg-white p-6 shadow-sm max-w-2xl mx-auto rounded-sm">
              {subForm === "projects" && <ProjectForm />}
              {subForm === "skills" && <SkillForm />}
              {subForm === "experience" && <ExperienceForm />}
              {subForm === "education" && <EducationForm />}
              {subForm === "profile" && <ProfileForm />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
