import {
  ActiveSessionType,
  MenuOption,
} from "@/interfaces/navigation.interface";
import React from "react";

interface navigationMenuProps {
  onSelectOption: (id: ActiveSessionType) => void;
}

export default function NavigationMenu({
  onSelectOption,
}: navigationMenuProps) {
  const menuOptions: MenuOption[] = [
    { label: "Quién soy", id: "about" },
    { label: "Proyectos", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Educación", id: "education" },
    { label: "Contacto", id: "contact" },
  ];

  return (
    <div className="w-full z-20">
      {/* Reducimos el gap a 5 para compactar la lista vertical bajo el nuevo diseño */}
      <ul className="flex flex-col gap-5 text-center font-yuzarsif text-2xl md:text-3xl">
        {menuOptions.map((option) => (
          <li key={option.id} className="flex justify-center">
            <button
              className="relative cursor-pointer transition-all duration-300 ease-out tracking-[0.15em] uppercase
                         text-stone-900/80 hover:text-stone-950 font-medium
                         hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]
                         hover:scale-105 origin-center"
              onClick={(e) => {
                e.stopPropagation();
                onSelectOption(option.id);
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
