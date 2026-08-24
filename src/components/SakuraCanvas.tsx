"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spinSpeed: number;
  opacity: number;
}

export default function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  function createPetal(width: number, isInitial = false): Petal {
    return {
      x: Math.random() * width,
      y: isInitial ? Math.random() * window.innerHeight : -20,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.8,
      speedX: Math.random() * 1 - 0.5,
      angle: Math.random() * Math.PI * 2,
      spinSpeed: Math.random() * 0.02 - 0.01,
      opacity: Math.random() * 0.6 + 0.4,
    };
  }

  const windController = useRef({ intensity: 0.4, TargetIntensity: 0.5 });

  useEffect(() => {
    const windControllerRef = windController.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajuste de las dimensiones del lienzo canvas(adaptables)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Ejecutamos al inicio
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Creación de los pétalos a dibujar
    const MAX_PETALS = 75;
    petalsRef.current = Array.from({ length: MAX_PETALS }, () =>
      createPetal(canvas.width, true),
    );

    // Orquestación de ráfagas de viento
    const triggerWindBurst = () => {
      const targetBurst = Math.random() * 2.5 + 0.5; // Intensidad aleatoria
      const duration = Math.random() * 3 + 2; // Duración de la ráfaga

      // Eleva la intensidad del viento con una aceleración suave
      gsap.to(windControllerRef, {
        intensity: targetBurst,
        duration: duration * 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Al terminar la ráfaga, regresa suavemente a la brisa del Monte Fuji
          gsap.to(windControllerRef, {
            intensity: 0.4,
            duration: duration * 0.7,
            ease: "power1.inOut",
          });
        },
      });
    };

    triggerWindBurst();
    const windInterval = setInterval(triggerWindBurst, 8000);

    // Bucle algorítmico
    const render = () => {
      // Borra la pantalla por completo para dibujar el cuadro limpio
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const petals = petalsRef.current;
      const currentWind = windControllerRef.intensity;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Caída vertical constante (Gravedad)
        p.y += p.speedY;

        // Movimiento horizontal: velocidad base + viento de Gsap + oscilación senoidal
        p.x += p.speedX + currentWind + Math.sin(p.angle) * 0.3;

        // Hace girar el pétalo sobre su propio eje en radianes
        p.angle += p.spinSpeed;

        // --- El siguiente fragmento (Dibujo geométrico del pétalo) irá aquí dentro ---

        // Guardo el estado limpio del lienzo antes de rotar
        ctx.save();

        // Muevo el centro del lienzo a la posición del pétalo
        ctx.translate(p.x, p.y);

        // Roto el lienzo según el angulo actual del pétalo
        ctx.rotate(p.angle);

        // Creamos un degradado de color tradicional japonés para dar profundidad
        const gradient = ctx.createLinearGradient(0, 0, p.size, p.size);
        gradient.addColorStop(0, `rgba(255, 183, 197, ${p.opacity})`); // Rosa pálido
        gradient.addColorStop(0.7, `rgba(239, 132, 153, ${p.opacity})`); // Rosa sakura medio
        gradient.addColorStop(1, `rgba(218, 100, 124, ${p.opacity * 0.4})`); // Carmesí traslúcido

        ctx.fillStyle = gradient;

        // Inicio de dibujo de los pétalos
        ctx.beginPath();

        // 1. Comenzamos en la punta del tallo (base inferior del pétalo)
        ctx.moveTo(0, p.size);

        // 2. Curva izquierda: dibuja el costado izquierdo ensanchándose orgánicamente
        ctx.bezierCurveTo(
          -p.size * 0.8,
          p.size * 0.5,
          -p.size * 0.6,
          -p.size * 0.5,
          0,
          -p.size,
        );

        // 3. Curva derecha: dibuja el costado derecho regresando simétricamente a la base
        ctx.bezierCurveTo(
          p.size * 0.6,
          -p.size * 0.5,
          p.size * 0.8,
          p.size * 0.5,
          0,
          p.size,
        );

        ctx.fill();

        // 4. Detalle de Tinta Tradicional: Dibujamos la muesca superior cortando el centro
        ctx.beginPath();
        ctx.fillStyle = "rgba(11, 12, 16, 0.15)"; // Un sombreado traslúcido tenue
        ctx.moveTo(0, -p.size);
        ctx.lineTo(-p.size * 0.15, -p.size * 0.8);
        ctx.lineTo(0, -p.size * 0.65); // El punto que "entra" en el pétalo
        ctx.lineTo(p.size * 0.15, -p.size * 0.8);
        ctx.closePath();
        ctx.fill();

        // Restauramos el lienzo para que el siguiente pétalo no herede la rotación
        ctx.restore();

        // ---

        // Algoritmo de Reciclaje: Si sale de la pantalla, lo teletransporta arriba
        if (p.y > canvas.height + 20 || p.x > canvas.width + 20 || p.x < -20) {
          petals[i] = createPetal(canvas.width, false);
        }
      }

      // Llama a la función continuamente sincronizada con los Hz de la pantalla
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearInterval(windInterval);
      gsap.killTweensOf(windControllerRef);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-10 h-full w-full bg-transparent"
    />
  );
}
