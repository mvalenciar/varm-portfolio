"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;
    const el = cursorRef.current;

    const moverCursor = (e: MouseEvent) => {
      // ⚡ GSAP mueve el componente con una micro-amortiguación líquida de videojuego
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05, // Ultra rápido para eliminar el retraso de entrada (input lag)
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moverCursor);
    return () => window.removeEventListener("mousemove", moverCursor);
  }, []);

  return (
    /* 🟢 CONTENEDOR DEL CURSOR VISUAL */
    /* Centramos el Hotspot usando -ml-4 y -mt-4 (la mitad de 32px) para que el centro de la flor haga el clic real */
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 pointer-events-none z-50 hidden md:block select-none drop-shadow-[0_2px_5px_rgba(255,114,139,0.3)]"
      style={{ transform: "translate3d(0,0,0)" }} // Forzamos aceleración por tarjeta de video (GPU)
    >
      <Image
        src="/images/cherry_blossom.svg"
        alt="Puntero Sakura"
        width={32}
        height={32}
        priority
        className="w-full h-full object-contain"
      />
    </div>
  );
}
