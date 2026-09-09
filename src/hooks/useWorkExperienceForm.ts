import React, { useState } from "react";

interface WorkExperienceFormData {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function useWorkExperienceForm() {
  const [formData, setFormData] = useState<WorkExperienceFormData>({
    company: "",
    role: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await fetch("/api/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data) {
        throw new Error(
          data.error || "Error de sincronización en registro de experiencia",
        );
      }

      setSuccessMessage("La experiencia ha sido registrada con éxito");
    } catch (error) {
      console.error(
        "Error de conexión con la base de experiencia laboral",
        error,
      );
      if (error instanceof Error) {
        setErrorMessage(
          error.message ||
            "Error de servidor al registrar la experiencia laboral",
        );
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    //States
    ...formData,
    isPending,
    successMessage,
    errorMessage,

    //Handlers
    handleChange,
    handleSubmit,
  };
}
