"use client";

import React from "react";
import { Lock, Mail } from "lucide-react";

interface LoginFormProps {
  email: string;
  password: string;
  authError: string | null;
  isSubmitting: boolean;
  setField: (field: "email" | "password", value: string) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}

export default function LoginForm({
  email,
  password,
  authError,
  isSubmitting,
  setField,
  handleLogin,
}: LoginFormProps) {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 font-sans text-stone-900 antialiased">
      <div className="w-full max-w-sm border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-2.5 w-2.5 rounded-full bg-red-600 animate-pulse" />
          <h1 className="text-xs font-black tracking-[0.25em] uppercase text-stone-950">
            VARM // ADMIN AUTH
          </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold tracking-wider text-stone-400 uppercase flex items-center gap-1.5">
              <Mail className="h-3 w-3" /> Correo Administrador
            </label>
            <input
              type="email"
              required
              disabled={isSubmitting} // 👈 Se bloquea el input mientras valida
              value={email}
              onChange={(e) => setField("email", e.target.value)}
              className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50 disabled:opacity-60"
              placeholder="tu-correo@example.com"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold tracking-wider text-stone-400 uppercase flex items-center gap-1.5">
              <Lock className="h-3 w-3" /> Contraseña Secreta
            </label>
            <input
              type="password"
              required
              disabled={isSubmitting}
              value={password}
              onChange={(e) => setField("password", e.target.value)}
              className="mt-1 w-full border border-stone-300 px-3 py-2 text-xs focus:border-red-600 focus:outline-none bg-stone-50 disabled:opacity-60"
              placeholder="••••••••••••••••"
            />
          </div>

          {authError && (
            <p className="text-[10px] font-bold tracking-wider text-red-600 uppercase bg-red-50 p-2 border border-red-200 animate-fadeIn">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-stone-950 text-white text-xs font-bold tracking-widest uppercase py-3 border border-stone-950 transition-all hover:bg-red-650 hover:border-red-650 disabled:bg-stone-400 disabled:border-stone-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Verificando...
              </>
            ) : (
              "Verificar Credenciales"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
