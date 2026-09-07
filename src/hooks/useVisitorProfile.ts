"use client";

import { useState, useEffect } from "react";

// Definimos el contrato exacto del registro único de tu tabla Profile
interface ProfileData {
  name: string;
  title: string;
  aboutMe: string;
  email: string;
  phone: string | null;
  location: string;
  linkedInUrl: string | null;
  gitHubUrl: string | null;
  cvUrl: string | null;
}

export function useVisitorProfile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");

        if (!response.ok) {
          throw new Error("No se pudieron sincronizar los datos de identidad.");
        }

        const data = await response.json();

        // Si la base de datos está vacía y devuelve un objeto sin ID, dejamos el estado en null
        if (data && data.name) {
          setProfile(data);
        }
      } catch (err: unknown) {
        console.error("Error interno en el hook de perfil visitante:", err);
        // ✅ TYPE GUARD NATIVO: Libre de any y blindado para tu linter
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error de red al consultar la identidad profesional.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
  };
}
