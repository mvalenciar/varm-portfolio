"use client";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import React, { useState } from "react";

interface EducationFormData {
  institution: string;
  degree: string;
  periodType: string;
  description: string;
  gradYear: number;
}

export default function useEducationForm() {
  const [formData, setFormData] = useState<EducationFormData>({
    institution: "",
    degree: "",
    periodType: "Pregrado Profesional",
    description: "",
    gradYear: new Date().getFullYear(),
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "gradYear" ? parseInt(value, 10) || "" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar la educación.");
      }

      setSuccessMessage(
        `Formación en "${formData.degree}" registrada con éxito.`,
      );
      setFormData({
        institution: "",
        degree: "",
        periodType: "Pregrado Profesional",
        description: "",
        gradYear: new Date().getFullYear(),
      });
    } catch (error) {
      console.error("Error en la conexión del formulario de educación:", error);

      if (error instanceof PrismaClientKnownRequestError) {
        setErrorMessage(
          error.message || "Error de red al intentar registrar los estudios.",
        );
      }
    } finally {
      setIsPending(false);
    }
  };
  return {
    // State
    ...formData,
    isPending,
    successMessage,
    errorMessage,

    // Handlers
    handleChange,
    handleSubmit,
  };
}
