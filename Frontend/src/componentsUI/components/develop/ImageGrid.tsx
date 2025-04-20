import Logo from "../../elements/Logo";

interface ImageGridProps {
  logos: string[];
  columns?: number;
  onClickLogo?: (src: string) => void;
  width?: number;
  height?: number;
}

export default function ImageGrid({
  logos,
  columns = 4,
  onClickLogo,
  width = 180,
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
            src={logoSrc}
            alt={`Logo ${i}`}
            width={width + 5}
            height={height ? height + 5 : undefined}
            className="bg-white/50 rounded-sm border border-white hover:scale-105 hover:drop-shadow-[0_0_3px_#fff] transition duration-200"
            onClick={() => onClickLogo?.(logoSrc)}
          />
        ))}
      </div>
    </div>
  );
}
