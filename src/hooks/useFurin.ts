import gsap from "gsap";
import { useEffect, useRef } from "react";

interface useFurinProps {
  volume?: number;
}

export function useFurin({ volume = 0.4 }: useFurinProps = {}) {
  const bellRef = useRef<HTMLDivElement>(null);
  //const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // audioRef.current = new Audio("/sounds/furin.mp3");
    // audioRef.current.volume = volume;
    // audioRef.current.loop = true;

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

    // const playSound = () => {
    //   if (audioRef.current) {
    //     audioRef.current.currentTime = 0;
    //     audioRef.current.play().then(() => {
    //       window.removeEventListener("click", playSound);
    //       window.removeEventListener("keydown", onKeyEnterPress);
    //     });
    //   }
    // };

    const onKeyEnterPress = (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        //playSound();
      }
    };

    //window.addEventListener("click", playSound);
    window.addEventListener("keydown", onKeyEnterPress);

    return () => {
      ctx.revert();
      //window.removeEventListener("click", playSound);
      window.removeEventListener("keydown", onKeyEnterPress);
    };
  }, [volume]);

  return {
    bellRef,
  };
}
