import { useRef, useState, useEffect } from "react";
import Logo from "@/componentsUI/elements/Logo";
import { BrandSchema, UniverseSchema } from "@/services/schemas/UniverseSchemas";

interface ResponsiveLogoGridProps {
  logos: UniverseSchema[] | BrandSchema[];
  width?: number;
  height?: number;
  columnsLg:number
  onClickLogo?: (src: string) => void;
}

export default function ResponsiveLogoGrid({
  logos,
  width = 160,
  
  height = 80,
  onClickLogo,
}: ResponsiveLogoGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const progress = (container.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress || 0);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className={`
          grid gap-4 place-items-center
          grid-cols-[repeat(10,minmax(70%,auto))] grid-flow-col
          sm:grid-cols-[repeat(6,minmax(33.33%,auto))] sm:grid-rows-2 sm:grid-flow-col
          md:grid-cols-[repeat(6,minmax(33.33%,auto))] md:grid-rows-2 md:grid-flow-col
          lg:grid-cols-5 lg:grid-rows-2 lg:grid-flow-row
          overflow-x-auto lg:overflow-visible
          scroll-smooth scroll-snap-x
          px-4 sm:px-4 lg:px-0
        `}
      >
        {logos.map((logo, i) => (
          <Logo
            key={i}
            src={logo.logoUrl}
            alt={`Logo ${i}`}
            width={width}
            height={height}
            className="bg-white/50 rounded-sm border border-white hover:scale-105 hover:drop-shadow-[0_0_3px_#fff] transition duration-200 scroll-snap-start"
            onClick={() => onClickLogo?.(logo._id)}
          />
        ))}
      </div>

      {/* Scroll progress bar - solo visible en móvil y tablet */}
      <div className="relative h-1 mt-2 lg:hidden bg-white/10 rounded overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-white/40 transition-all duration-200"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </div>
  );
}
