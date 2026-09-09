import { useEffect, useState } from "react";

interface WorkExperience {
  id: string;
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
}

export function useVisitorExperience() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experience");

        if (!response.ok)
          throw new Error("No se logro leer la experiencia laboral");

        const data: WorkExperience[] = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error en el hook useVisitorExperience");
        if (error instanceof Error)
          setError(
            error.message ||
              "Error de red al consultar los datos de la trayectoria laboral",
          );
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return {
    experiences,
    isLoading,
    error,
  };
}
