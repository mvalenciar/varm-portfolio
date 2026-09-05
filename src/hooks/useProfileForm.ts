"use client";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { useState, useEffect } from "react";

interface ProfileFormData {
  name: string;
  title: string;
  aboutMe: string;
  email: string;
  phone: string;
  location: string;
  linkedInUrl: string;
  gitHubUrl: string;
  cvUrl: string;
}

export function useProfileForm() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "Milton Valencia R.",
    title: "Full Stack Developer",
    aboutMe: "",
    email: "",
    phone: "",
    location: "Colombia",
    linkedInUrl: "",
    gitHubUrl: "",
    cvUrl: "",
  });

  const [isPending, setIsPending] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 🕵️ EFECTO VIGÍA: Carga tus datos reales existentes al abrir la pestaña
  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setFormData({
            name: data.name || "",
            title: data.title || "",
            aboutMe: data.aboutMe || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            linkedInUrl: data.linkedInUrl || "",
            gitHubUrl: data.gitHubUrl || "",
            cvUrl: data.cvUrl || "",
          });
        }
      })
      .catch((err) =>
        console.error("Error al precargar datos de perfil:", err),
      );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al sincronizar tu perfil.");
      }

      setSuccessMessage(
        "¡Tu perfil profesional e identidad digital han sido actualizados con éxito en Supabase!",
      );
    } catch (error) {
      console.error("Error en la conexión del perfil:", error);

      if (error instanceof PrismaClientKnownRequestError) {
        setErrorMessage(
          error.message || "Error de red al conectar con el servidor.",
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
