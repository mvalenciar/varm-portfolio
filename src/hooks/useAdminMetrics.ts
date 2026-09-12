"use client";

import { Briefcase, Code, Eye, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

interface MetricsData {
  skills: number;
  projects: number;
  education: number;
  views: number;
}

export function useAdminMetrics() {
  const [metrics, setMetrics] = useState<MetricsData>({
    skills: 0,
    projects: 0,
    education: 0,
    views: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Jalamos los contadores matemáticos reales desde la API unificada
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setMetrics({
            skills: data.skills || 0,
            projects: data.projects || 0,
            education: data.education || 0,
            views: data.analytics || 0,
          });
        }
      })
      .catch((err) =>
        console.error("Error al leer contadores relacionales:", err),
      )
      .finally(() => setIsLoading(false));
  }, []);

  const cardsConfig = [
    {
      title: "Habilidades",
      value: metrics.skills,
      icon: Code,
      color: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      title: "Proyectos",
      value: metrics.projects,
      icon: Briefcase,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Educación",
      value: metrics.education,
      icon: GraduationCap,
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      title: "Visitas Totales",
      value: metrics.views,
      icon: Eye,
      color: "text-red-600 bg-red-50 border-red-200",
    },
  ];

  return {
    cardsConfig,
    isLoading,
  };
}
