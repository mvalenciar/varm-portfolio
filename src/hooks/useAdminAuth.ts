"use client";

import { useReducer, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { AuthAction, AuthState } from "@/interfaces/adminAuth.interface";

// 🥚 ESTADO DE FÁBRICA (INITIAL STATE)
const initialState: AuthState = {
  session: null,
  loading: true,
  isSubmitting: false,
  isLoggingOut: false,
  email: "",
  password: "",
  authError: null,
};

// 🧠 3. EL REDUCER: El cerebro calculador puro de la aduana
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "AUTH_START":
      return { ...state, isSubmitting: true, authError: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        session: action.session,
        isSubmitting: false,
        email: "",
        password: "",
        authError: null,
      };
    case "AUTH_FAILURE":
      return { ...state, isSubmitting: false, authError: action.error };
    case "SET_SESSION":
      return { ...state, session: action.session, loading: false };
    case "LOGOUT_START":
      return { ...state, isLoggingOut: true };
    case "LOGOUT_SUCCESS":
      return { ...initialState, loading: false };
    default:
      return state;
  }
}

export function useAdminAuth() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch({ type: "SET_SESSION", session });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        dispatch({ type: "SET_SESSION", session });
      } else {
        dispatch({ type: "LOGOUT_SUCCESS" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "AUTH_START" });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: state.email,
      password: state.password,
    });

    if (error) {
      dispatch({
        type: "AUTH_FAILURE",
        error: "Credenciales inválidas. Acceso denegado.",
      });
    } else if (data?.session) {
      dispatch({ type: "AUTH_SUCCESS", session: data.session });
    }
  };

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT_START" });
    await supabase.auth.signOut();
    dispatch({ type: "LOGOUT_SUCCESS" });
  };

  const setField = (field: "email" | "password", value: string) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  return {
    ...state,
    setField,
    handleLogin,
    handleLogout,
  };
}
