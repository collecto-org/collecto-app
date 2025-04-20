import { BrandSchema, UniverseSchema } from "@/services/schemas/UniverseSchemas";
import Logo from "../../elements/Logo";
import { universeLogos } from "@/componentsUI/containers/develop/MockData";

interface ImageGridProps {
  logos: BrandSchema[] | UniverseSchema[];
  columns?: number;
  onClickLogo?: (src: string) => void;
  width?: number;
  height?: number;
}

export default function ImageGrid({
  logos,
  columns = 4,
  onClickLogo,
  width = 80,
  height,
}: ImageGridProps) {
  return (
    <div className="w-full max-h-40">
      <div
        className={`grid grid-cols-${columns} gap-4 place-items-center`}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {logos.map((logoSrc, i) => (
          <Logo
            key={i}
            src={logoSrc.logoUrl || universeLogos[0]}
            alt={`Logo ${i}`}
            width={width + 5}
            height={height ? height + 5 : undefined}
            className="hover:scale-110 hover:drop-shadow-[0_0_3px_#fff] transition duration-200"

          />
        ))}
      </div>
    </div>
  );
}
