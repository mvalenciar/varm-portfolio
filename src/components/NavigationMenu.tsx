import React, { useRef } from "react";
import { ActiveSessionType } from "@/interfaces/navigation.interface";
import { MENU_OPTIONS } from "@/lib/constants";

import { useMenuCascadeEffect } from "@/hooks/useMenuCascadeEffect";
import { usePortfolioAudio } from "@/context/AudioContext";

interface navigationMenuProps {
  onSelectOption: (id: ActiveSessionType) => void;
}

export default function NavigationMenu({
  onSelectOption,
}: navigationMenuProps) {
  const menuRef = useRef<HTMLUListElement>(null);

  const { playHyoshigiSound } = usePortfolioAudio();

  useMenuCascadeEffect(menuRef);

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
             text-stone-700 hover:text-stone-950 font-medium px-4 py-1.5 rounded-sm
             hover:bg-white/40 hover:backdrop-blur-sm
             hover:shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.4)]
             hover:scale-105 origin-center opacity-0"
              onClick={(e) => {
                e.stopPropagation();
                onSelectOption(option.id);
                window.dispatchEvent(new Event("change-section"));
              }}
              onMouseEnter={playHyoshigiSound}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
