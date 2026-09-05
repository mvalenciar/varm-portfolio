"use client";

import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { useState, useEffect } from "react";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
}

export default function useVisitorSkills() {
  const [frontSkills, setFrontSkills] = useState<string[]>([]);
  const [backSkills, setBackSkills] = useState<string[]>([]);
  const [qaSkills, setQaSkills] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");

        if (!response.ok) {
          throw new Error("No se pudieron leer las habilidades.");
        }

        const data = (await response.json()) as Skill[];

        setFrontSkills(
          data.filter((s) => s.category === "Frontend").map((s) => s.name),
        );
        setBackSkills(
          data.filter((s) => s.category === "Backend").map((s) => s.name),
        );
        setQaSkills(data.filter((s) => s.category === "QA").map((s) => s.name));
      } catch (err) {
        console.error("Error en useVisitorSkills:", err);
        if (err instanceof PrismaClientKnownRequestError) {
          setError(err.message || "Error al conectar con la base de datos.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return {
    frontSkills,
    backSkills,
    qaSkills,
    isLoading,
    error,
  };
}
