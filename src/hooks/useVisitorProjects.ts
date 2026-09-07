import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { useEffect, useState } from "react";

interface Project {
  title: string;
  description: string;
  gitHubUrl: string | null;
  liveUrl: string | null;
  isPersonal: boolean;
  skills: { name: string }[];
}

export const useVisitorProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("api/projects");

        if (!response) {
          throw new Error("No se pudieron leer los proyectos");
        }

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Error interno en el hook", error);
        if (error instanceof PrismaClientKnownRequestError) {
          setError(
            error.message || "Error en la red al consultar los proyectos",
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return {
    projects,
    isLoading,
    error,
  };
};
