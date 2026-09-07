import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { useEffect, useState } from "react";

interface Education {
  id: string;
  institution: string;
  degree: string;
  periodType: string;
  description: string;
  gradYear: number;
}

export function useVisitorEducation() {
  const [educationHistory, setEducationHistory] = useState<Education[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch("api/education");

        if (!response) {
          throw new Error(
            "Error en la sincronización de la historia académica",
          );
        }

        const data: Education[] = await response.json();
        setEducationHistory(data);
      } catch (error) {
        console.error("Error interno en el hook useVisitorEducation");
        if (error instanceof PrismaClientKnownRequestError) {
          setError(
            error.message || "Error de red al consultar el historial académico",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchEducation();
  }, []);

  return {
    educationHistory,
    isLoading,
    error,
  };
}
