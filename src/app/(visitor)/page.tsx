import WelcomeHero from "@/components/WelcomeHero";
import React from "react";

// 🚀 REGLA: Exportación por defecto obligatoria para que Next.js la reconozca
export default function VisitorPage() {
  return (
    <main className="w-full">
      <WelcomeHero />
    </main>
  );
}
