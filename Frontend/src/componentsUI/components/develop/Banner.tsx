import { useMemo } from "react";
import ImageGrid from "../../components/develop/ImageGrid";
import HighlightedText from "../../elements/HighlightedText";

interface BannerProps {
  backgroundImages: string[];
  text: string;
  highlights: string | string[];
  logos: string[];
  height?: string;
}

export default function Banner({
  backgroundImages,
  text,
  highlights,
  logos,
  height = "h-80",
}: BannerProps) {
  const selectedImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  }, [backgroundImages]);
  return (
    <div
      className={`relative w-full ${
        height ?? "h-80"
      } rounded-md overflow-hidden`}
    >
      <img
        src={selectedImage}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div
        className="relative z-10 w-full h-full flex flex-col justify-center items-center
       bg-black bg-opacity-30 text-white text-center px-2 md:px-4 max-w-screen-xl mx-auto"
      >
        <h2 className="text-xl md:text-xl font-semibold">
          <HighlightedText text={text} highlights={highlights} />
        </h2>
        <ImageGrid
          logos={logos}
          columns={5}
          width={160}
          height={80}
          onClickLogo={(src) => alert(`Filtrar por universo: ${src}`)}
        />
      </div>
    </div>
  );
}
