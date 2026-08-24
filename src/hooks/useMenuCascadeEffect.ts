import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { Back } from "gsap";

export function useMenuCascadeEffect(
  menuRef: RefObject<HTMLUListElement | null>,
) {
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
  }, [menuRef]);
}
