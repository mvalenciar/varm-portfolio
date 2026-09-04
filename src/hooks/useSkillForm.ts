"use client";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { useState } from "react";

interface SkillFormData {
  name: string;
  category: string;
  level: number;
}

export default function useSkillForm() {
  const [formData, setFormData] = useState<SkillFormData>({
    name: "",
    category: "Frontend",
    level: 3,
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // Lanzamos la petición HTTP POST nativa usando Fetch
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar la habilidad.");
      }

      // Si el servidor responde exitosamente (Status 201 Created)
      setSuccessMessage(
        `Habilidad "${formData.name}" guardada con éxito en Supabase.`,
      );

      // Reseteamos el formulario al estado de fábrica
      setFormData({ name: "", category: "Frontend", level: 3 });
    } catch (error) {
      console.error("Error en la conexión del formulario de skills:", error);

      if (error instanceof PrismaClientKnownRequestError) {
        setErrorMessage(
          error.message || "Error de red al intentar conectar con el servidor.",
        );
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    ...formData,
    isPending,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  };
}
