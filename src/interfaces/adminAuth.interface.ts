import type { Session } from "@supabase/supabase-js";

// 📋 1. EL CONTRATO DEL ESTADO (STATE INTERFACE)
export interface AuthState {
  session: Session | null;
  loading: boolean;
  isSubmitting: boolean;
  isLoggingOut: boolean;
  email: string;
  password: string;
  authError: string | null;
}

// 🎯 2. EL CONTRATO DE LAS ACCIONES EXCLUSIVAS (ACTIONS TYPE)
export type AuthAction =
  | { type: "SET_FIELD"; field: "email" | "password"; value: string }
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; session: Session }
  | { type: "AUTH_FAILURE"; error: string }
  | { type: "SET_SESSION"; session: Session | null }
  | { type: "LOGOUT_START" }
  | { type: "LOGOUT_SUCCESS" };
