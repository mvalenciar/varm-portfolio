//4f7e2a1b-9c8d-4e6f-a3b2-1c0d9e8f7a6b

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const ADMIN_PROFILE_ID = "4f7e2a1b-9c8d-4e6f-a3b2-1c0d9e8f7a6b";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      title,
      aboutMe,
      email,
      phone,
      location,
      linkedInUrl,
      gitHubUrl,
      cvUrl,
    } = body;

    if (!name || !title || !aboutMe || !email || !phone || !location) {
      return NextResponse.json(
        {
          error:
            "Faltan campos obligatorios para actualizar tu perfil profesional.",
        },
        { status: 400 },
      );
    }

    const updatedProfile = await db.profile.upsert({
      where: { id: ADMIN_PROFILE_ID },
      update: {
        name: name.trim(),
        title: title.trim(),
        aboutMe: aboutMe.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        location: location.trim(),
        linkedInUrl: linkedInUrl ? linkedInUrl.trim() : null,
        gitHubUrl: gitHubUrl ? gitHubUrl.trim() : null,
        cvUrl: cvUrl ? cvUrl.trim() : null,
      },
      create: {
        id: ADMIN_PROFILE_ID, // Amarramos el registro único
        name: name.trim(),
        title: title.trim(),
        aboutMe: aboutMe.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        location: location.trim(),
        linkedInUrl: linkedInUrl ? linkedInUrl.trim() : null,
        gitHubUrl: gitHubUrl ? gitHubUrl.trim() : null,
        cvUrl: cvUrl ? cvUrl.trim() : null,
      },
    });

    return NextResponse.json(updatedProfile, { status: 200 });
  } catch (error) {
    console.error("Error en el servidor al sincronizar el perfil:", error);
    return NextResponse.json(
      {
        error:
          "Error interno del servidor al procesar tu identidad profesional.",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const profile = await db.profile.findUnique({
      where: { id: ADMIN_PROFILE_ID },
    });

    // Si la base de datos está virgen y vacía, retornamos un objeto vacío amigable
    return NextResponse.json(profile || {}, { status: 200 });
  } catch (error) {
    console.error("Error en el servidor al consultar el perfil:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al leer los datos de identidad." },
      { status: 500 },
    );
  }
}
