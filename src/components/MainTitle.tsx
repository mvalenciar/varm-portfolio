import gsap from "gsap";
import React, { useEffect } from "react";

interface MainTitleProps {
  mainTitle: string;
  activeSession: string | null;
  isStarted: boolean;
}

export default function MainTitle({
  mainTitle,
  activeSession,
  isStarted,
}: MainTitleProps) {
  //const { playBrushPencilSound } = usePortfolioAudio();

  useEffect(() => {
    // Uso de gsapContext para proteger la animación del doble montaje del componente
    const ctx = gsap.context(() => {
      gsap.to(".shodo-letter", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.35,
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className={`text-center transition-all duration-750 ease-out h-28 flex items-center justify-center ${
        activeSession
          ? "opacity-0 scale-75 pointer-events-none -translate-y-10"
          : isStarted
            ? "transform -translate-y-8 opacity-100"
            : "transform translate-y-6 opacity-100"
      }`}
    >
      <h1 className="font-pincel text-7xl md:text-9xl tracking-wider text-stone-950 uppercase drop-shadow-sm">
        {mainTitle.split("").map((letter) => (
          <span
            key={letter}
            className="shodo-letter inline-block"
            style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          >
            {letter}
          </span>
        ))}
      </h1>
    </div>
  );
}
