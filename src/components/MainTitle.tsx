import React from "react";

interface MainTitleProps {
  activeSession: string | null;
  isStarted: boolean;
}

export default function MainTitle({
  activeSession,
  isStarted,
}: MainTitleProps) {
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
        VARM
      </h1>
    </div>
  );
}
