import { db } from "@/lib/db";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [
      skillsCount,
      projectsCount,
      educationCount,
      analyticsCount,
      rawVisits,
    ] = await Promise.all([
      db.skill.count(),
      db.project.count(),
      db.education.count(),
      db.analytics.count(),
      db.analytics.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
        select: { createdAt: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    const daysMap: { [key: number]: { name: string; visits: number } } = {
      1: { name: "Lun", visits: 0 },
      2: { name: "Mar", visits: 0 },
      3: { name: "Mié", visits: 0 },
      4: { name: "Jue", visits: 0 },
      5: { name: "Vie", visits: 0 },
      6: { name: "Sáb", visits: 0 },
      0: { name: "Dom", visits: 0 },
    };

    rawVisits.forEach((visit) => {
      const dayIndex = new Date(visit.createdAt).getDay();
      if (daysMap[dayIndex]) {
        daysMap[dayIndex].visits += 1;
      }
    });

    const chartData = [1, 2, 3, 4, 5, 6, 0].map((day) => daysMap[day]);

    return NextResponse.json(
      {
        skills: skillsCount,
        projects: projectsCount,
        education: educationCount,
        analytics: analyticsCount,
        chartData,
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

export async function POST() {
  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") ?? "";

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
