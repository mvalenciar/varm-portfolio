import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan las variables de entorno de Supabase en el archivo .env",
  );
}

// Inicialización el cliente universal para autenticación y llamadas HTTP rápidas
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
