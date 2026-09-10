"use client";

import WelcomeHero from "@/components/WelcomeHero";
import React, { useEffect } from "react";

export default function VisitorPage() {
  //Tráfico de visitas
  useEffect(() => {
    fetch("/api/analytics", { method: "POST" })
      .then((res) => res.json())
      .catch((err) => console.error("Error de analíticas", err));
  }, []);

  return (
    <main className="w-full">
      <WelcomeHero />
    </main>
  );
}
