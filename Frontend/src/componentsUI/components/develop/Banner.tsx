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
  height = "h-96",
}: BannerProps) {
  const selectedImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
  }, [backgroundImages]);
  return (
    <div className={`relative w-full ${height ?? "h-80"} overflow-hidden`}>
      <img
        src={selectedImage}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover z-0 mt-10" //mt-10 agregado
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        <div className="max-w-7xl w-full px-4 mx-auto text-white text-center space-y-4">
          <h2 className="text-xl md:text-2xl font-bold pb-4 pt-8">
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
    </div>
  );
}
