import { db } from "@/lib/db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { institution, degree, periodType, description, gradYear } = body;

    if (!institution || !degree || !periodType || !description || !gradYear) {
      return NextResponse.json(
        {
          error: "Faltan campos obligatorios para registrar la educación",
        },
        {
          status: 400,
        },
      );
    }

    const newEducation = await db.education.create({
      data: {
        institution: institution.trim(),
        degree: degree.trim(),
        periodType: periodType.trim(),
        description: description.trim(),
        gradYear: parseInt(gradYear.toString(), 10),
      },
    });

    return NextResponse.json(newEducation, { status: 201 });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Ya tienes registrado un título idéntico en tu historial." },
          { status: 409 },
        );
      }
    }

    console.error("Error en el servidor al guardar educación:", error);

    return NextResponse.json(
      {
        error: "Error interno del servidor al procesar la formación académica.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET() {
  try {
    const educationHistory = await db.education.findMany({
      orderBy: {
        gradYear: "desc",
      },
    });
    return NextResponse.json(educationHistory, { status: 200 });
  } catch (error) {
    console.error("Error en el servidor al consultar educación:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al leer el historial académico." },
      { status: 500 },
    );
  }
}
