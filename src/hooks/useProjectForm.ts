"use client";

import { useState, useEffect } from "react";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

interface ProjectFormData {
  title: string;
  description: string;
  gitHubUrl: string;
  liveUrl: string;
  isPersonal: boolean;
}

interface DbSkill {
  id: string;
  name: string;
  category: string;
}

export function useProjectForm() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    gitHubUrl: "",
    liveUrl: "",
    isPersonal: true,
  });

  // 🛠️ ESTADOS DE RELACIÓN (Muchos a Muchos)
  const [availableSkills, setAvailableSkills] = useState<DbSkill[]>([]);
  const [selectedSkillsIds, setSelectedSkillsIds] = useState<string[]>([]);

  // ⚡ ESTADOS DE FLUJO ASÍNCRONO UX
  const [isPending, setIsPending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🕵️ EFECTO VIGÍA: Al abrir el formulario, jala las habilidades que ya tienes en Supabase
  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setAvailableSkills(data);
      })
      .catch((err) =>
        console.error("Error al cargar skills para el proyecto:", err),
      );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // 🔗 CONTROLADOR DEL CHECKBOX DE SKILLS: Añade o quita IDs del archivador de hilos
  const handleSkillToggle = (skillId: string) => {
    setSelectedSkillsIds(
      (prev) =>
        prev.includes(skillId)
          ? prev.filter((id) => id !== skillId) // Si ya estaba, la saca
          : [...prev, skillId], // Si no estaba, la mete
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Empaquetamos los datos del formulario junto al array de IDs relacionales
      const payload = {
        ...formData,
        skillsIds: selectedSkillsIds,
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar el proyecto.");
      }

      setSuccessMessage(
        `Proyecto "${formData.title}" guardado con éxito y enlazado en Supabase.`,
      );

      // Reseteamos el formulario limpio
      setFormData({
        title: "",
        description: "",
        gitHubUrl: "",
        liveUrl: "",
        isPersonal: true,
      });
      setSelectedSkillsIds([]);
    } catch (error) {
      console.error("Error en la conexión del formulario de proyectos:", error);

      if (error instanceof PrismaClientKnownRequestError) {
        setErrorMessage(
          error.message || "Error de red al intentar guardar la obra.",
        );
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    //states
    ...formData,
    availableSkills,
    selectedSkillsIds,
    isPending,
    successMessage,
    errorMessage,

    //handlers
    handleChange,
    handleSkillToggle,
    handleSubmit,
  };
}
