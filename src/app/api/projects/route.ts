import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, description, gitHubUrl, liveUrl, isPersonal, skillsIds } =
      body;

    if (!title || !description) {
      return NextResponse.json(
        {
          error: "El título y la descripción técnica son campos obligatorios.",
        },
        {
          status: 400,
        },
      );
    }

    const newProject = await db.project.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        gitHubUrl: gitHubUrl ? gitHubUrl.trim() : null,
        liveUrl: liveUrl ? liveUrl.trim() : null,
        isPersonal: Boolean(isPersonal),

        skills:
          skillsIds && Array.isArray(skillsIds)
            ? {
                connect: skillsIds.map((id: string) => ({ id })),
              }
            : undefined,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Ya existe un proyecto registrado con ese mismo título." },
          { status: 409 },
        );
      }
    }

    console.error("Error en el servidor al guardar el proyecto:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor al procesar el proyecto.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error en el servidor al obtener los proyectos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al consultar los proyectos." },
      { status: 500 },
    );
  }
}
