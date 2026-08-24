"use client";

import { useRef } from "react";
import { useSakuraPhysical } from "@/hooks/useSakuraPhysical";

export default function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useSakuraPhysical(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-10 h-full w-full bg-transparent"
    />
  );
}
