import React, { useEffect, useRef } from "react";
import { ActiveSessionType } from "@/interfaces/navigation.interface";
import { MENU_OPTIONS } from "@/lib/constants";

import gsap from "gsap";
import { Back } from "gsap";

interface navigationMenuProps {
  onSelectOption: (id: ActiveSessionType) => void;
}

export default function NavigationMenu({
  onSelectOption,
}: navigationMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (menuRef.current) {
        // Identificación de botones del menu
        const menuButtons = menuRef.current.querySelectorAll("button");

        // Aplicación de animación efecto cascada
        gsap.fromTo(
          menuButtons,
          {
            opacity: 0,
            x: -15,
            y: 12,
            scale: 0.94,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: Back.easeInOut.config(1.2),
            stagger: 0.08,
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full z-20">
      {/* Reducimos el gap a 5 para compactar la lista vertical bajo el nuevo diseño */}
      <ul
        ref={menuRef}
        className="flex flex-col gap-5 text-center font-yuzarsif text-2xl md:text-3xl"
      >
        {MENU_OPTIONS.map((option) => (
          <li key={option.id} className="flex justify-center">
            <button
              className="relative cursor-pointer transition-all duration-300 ease-out tracking-[0.15em] uppercase
                         text-stone-900/80 hover:text-stone-950 font-medium
                         hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]
                         hover:scale-105 origin-center opacity-0"
              onClick={(e) => {
                e.stopPropagation();
                onSelectOption(option.id);
                window.dispatchEvent(new Event("change-section"));
              }}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
