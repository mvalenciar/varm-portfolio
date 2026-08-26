import gsap from "gsap";
import { useEffect, useRef } from "react";

export function useFurin() {
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bellRef.current) {
        gsap.fromTo(
          bellRef.current,
          {
            rotation: -4,
          },
          {
            rotation: 4,
            duration: 2.5,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          },
        );
      }
    });

    const onKeyEnterPress = (e: KeyboardEvent) => {
      if (e.key == "Enter") {
      }
    };

    window.addEventListener("keydown", onKeyEnterPress);

    return () => {
      ctx.revert();

      window.removeEventListener("keydown", onKeyEnterPress);
    };
  }, []);

  return {
    bellRef,
  };
}
