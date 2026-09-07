import React from "react";

interface PaginationControllerProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  playMokugyoSound: () => void;
  playHyoshigiSound: () => void;
}

export default function PaginationController({
  currentPage,
  totalPages,
  setCurrentPage,
  playMokugyoSound,
  playHyoshigiSound,
}: PaginationControllerProps) {
  return (
    <div className="flex justify-between items-center border-t border-dashed border-stone-300/60 pt-4 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage((prev) => prev - 1);
          playMokugyoSound();
        }}
        className="font-yuzarsif text-sm tracking-widest text-stone-500 hover:text-stone-950 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all hover:scale-105"
        onMouseEnter={playHyoshigiSound}
      >
        ◀ ANTERIOR
      </button>

      <span className="font-serif text-xs text-stone-500 tracking-widest">
        {currentPage} / {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          setCurrentPage((prev) => prev + 1);
          playMokugyoSound();
        }}
        className="font-yuzarsif text-sm tracking-widest text-stone-500 hover:text-stone-950 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-all hover:scale-105"
        onMouseEnter={playHyoshigiSound}
      >
        SIGUIENTE ▶
      </button>
    </div>
  );
}
