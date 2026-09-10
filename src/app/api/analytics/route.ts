import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [skillsCount, projectsCount, educationCount, analyticsCount] =
      await Promise.all([
        db.skill.count(),
        db.project.count(),
        db.education.count(),
        db.analytics.count(),
      ]);

    return NextResponse.json(
      {
        skills: skillsCount,
        projects: projectsCount,
        education: educationCount,
        analytics: analyticsCount,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Error en el servidor al calcular las métricas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar los contadores." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const userAgent = request.headers.get("user-agent") ?? "";

    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const deviceType = isMobile ? "Mobile" : "Desktop";

    const newVisit = await db.analytics.create({
      data: {
        device: deviceType,
        ipHash: "anonymous",
      },
    });

    return NextResponse.json(
      { success: true, visitId: newVisit.id },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "Error silencioso al registrar la visita en el backend:",
      error,
    );
    return NextResponse.json(
      { error: "Error al registrar analíticas." },
      { status: 500 },
    );
  }
}
