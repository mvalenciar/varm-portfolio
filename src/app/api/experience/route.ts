import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, role, description, startDate, endDate } = body;

    if (!company || !role || !description || !startDate || !endDate) {
      return NextResponse.json(
        {
          error:
            "Faltan campos obligatorios para registrar la experiencia laboral",
        },
        {
          status: 400,
        },
      );
    }

    const newExperience = await db.workExperience.create({
      data: {
        company: company.trim(),
        role: role.trim(),
        description: description.trim(),
        startDate: startDate.trim(),
        endDate: endDate.trim(),
      },
    });

    return NextResponse.json(newExperience, { status: 201 });
  } catch (error) {
    console.error(
      "Error de servidor al intentar registrar la experiencia laboral",
      error,
    );
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error:
              "Ya hay una experiencia idéntica registrada en tu base de datos",
          },
          {
            status: 400,
          },
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Error interno en el servidor al procesar la información de la experiencia laboral",
      },
      {
        status: 500,
      },
    );
  }
}
export async function GET() {
  try {
    const workExperience = await db.workExperience.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
    return NextResponse.json(workExperience, {
      status: 200,
    });
  } catch (error) {
    console.error(
      "Error en el servidor al intentar consultar la experiencia laboral",
      error,
    );
    return NextResponse.json(
      {
        error:
          "Error interno en el servidor al consultar la experiencia laboral",
      },
      {
        status: 500,
      },
    );
  }
}
