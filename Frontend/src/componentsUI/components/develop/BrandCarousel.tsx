import { useRef } from "react";
import Logo from "@/componentsUI/elements/Logo";

interface BrandCarouselProps {
  logos: string[];
  width?: number;
  height?: number;
  onClickLogo?: (src: string) => void;
}

export default function BrandCarousel({
  logos,
  width = 90,
  height = 90,
  onClickLogo,
}: BrandCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -width - 16 : width + 16;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full bg-white py-4">
      {/* Flechas de navegación: visibles desde sm en adelante */}
      <button
        onClick={() => scrollBy("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center bg-[#1d313c] text-white rounded-full w-9 h-9 shadow hover:scale-105 transition"
        aria-label="Scroll left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      <button
        onClick={() => scrollBy("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 hidden sm:flex items-center justify-center bg-[#1d313c] text-white rounded-full w-9 h-9 shadow hover:scale-105 transition"
        aria-label="Scroll right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
        </svg>
      </button>

      {/* Contenedor de logos con scroll */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth px-4 sm:px-12 lg:scrollbar-hide"
      >
        {logos.map((logo, index) => (
          <Logo
            key={index}
            src={logo}
            alt={`Logo ${index}`}
            width={width}
            height={height}
            className="shrink-0 bg-white hover:scale-110 transition"
            onClick={() => onClickLogo?.(logo)}
          />
        ))}
      </div>
    </div>
  );
}
