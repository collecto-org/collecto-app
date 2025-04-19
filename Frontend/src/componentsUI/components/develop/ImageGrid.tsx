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
            width={width}
            height={height}
            className="border border-white hover:scale-110 hover:drop-shadow-[0_0_6px_#e8796e] transition duration-200"
            onClick={() => onClickLogo?.(logoSrc)}
          />
        ))}
      </div>
    </div>
  );
}
