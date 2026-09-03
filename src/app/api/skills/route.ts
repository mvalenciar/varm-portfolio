import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Importamos el puente relacional de Prisma que acabamos de crear
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";

// 📥 1. EL MÉTODO POST: Recibe datos del Dashboard y los guarda en la nube
export async function POST(request: Request) {
  try {
    // A. Capturamos y masticamos el paquete JSON que viene viajando desde el formulario
    const body = await request.json();
    const { name, category, level } = body;

    // B. FILTRO DEFENSIVO (Ciberseguridad): Validamos que no vengan campos vacíos
    if (!name || !category || !level) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios en la petición." },
        { status: 400 }, // Status 400 = Bad Request (Petición Malformada)
      );
    }

    const cleanName = name.trim();

    // C. INYECCIÓN RELACIONAL: Prisma ejecuta la consulta SQL nativa en Supabase
    const newSkill = await db.skill.create({
      data: {
        name: cleanName,
        category,
        // Forzamos a que el nivel sea un número entero estricto para que la DB no proteste
        level: parseInt(level.toString(), 10),
      },
    });

    // D. RESPUESTA DE ÉXITO: Le devolvemos al Dashboard el registro recién creado
    return NextResponse.json(newSkill, { status: 201 }); // Status 201 = Created (Creado con éxito)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error:
              "Esta habilidad ya se encuentra registrada en tu portafolio.",
          },
          { status: 409 },
        );
      }
    }

    console.error("Error en el servidor al guardar la habilidad:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar los datos." },
      { status: 500 }, // Status 500 = Internal Server Error (Algo tronó en el código)
    );
  }
}

// 📤 2. EL MÉTODO GET: Consulta la base de datos y le escupe las habilidades al portafolio público
export async function GET() {
  try {
    // Prisma viaja a Supabase y trae todas las filas de la tabla Skill ordenadas por fecha
    const skills = await db.skill.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Le respondemos al frontend con la lista completa de tus tecnologías en un array JSON
    return NextResponse.json(skills, { status: 200 }); // Status 200 = OK (Consulta exitosa)
  } catch (error) {
    console.error("Error en el servidor al obtener las habilidades:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al consultar las habilidades." },
      { status: 500 },
    );
  }
}
