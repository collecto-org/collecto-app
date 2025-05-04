import { useEffect, useState } from "react";
import HighlightedText from "../../elements/HighlightedText";

import {
  BrandSchema,
  UniverseSchema,
} from "@/services/schemas/UniverseSchemas";
import ResponsiveLogoGrid from "../../components/develop/ResponsiveLogoGrid";
import { useNavigate } from "react-router-dom";

interface BannerProps {
  backgroundImages: UniverseSchema[] | BrandSchema[];
  text: string;
  highlights: string | string[];
  logos: UniverseSchema[] | BrandSchema[];
  height?: string;
}

export default function Banner({
  backgroundImages:prevBackgroundImages,
  text,
  highlights,
  logos,
  height = "h-96",
}: BannerProps) {
  const navigate = useNavigate();
  const mainImage = "/gridImages/collecto-banner-principal.jpg";
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [fade, setFade] = useState(true);
  const backgroundImages:string[] = []
  prevBackgroundImages.map((universe) => backgroundImages.push(`/gridImages/${universe.slug}.jpg`) )

  // 🔄 Función para elegir una imagen aleatoria distinta a la actual
  const getRandomImage = (current: string) => {
    const otherImages = backgroundImages.filter((img) => img !== current);
    return otherImages[Math.floor(Math.random() * otherImages.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImage((prev) => getRandomImage(prev));
        setFade(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      {/* Imagen de fondo con fade-in/out */}
      <img
        src={currentImage}
        alt="Banner"
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        onError={() =>
          console.warn("Imagen no cargada correctamente:", currentImage)
        }
      />

      {/* Capa oscura encima */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />

      {/* Contenido */}
      <div className="relative z-20 w-full h-full flex flex-col justify-center items-center">
        <div className="max-w-7xl w-full px-4 mx-auto text-white text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-black pb-4 pt-8 font-lato text-shadow-darkblue">
            <HighlightedText text={text} highlights={highlights} />
          </h2>
          <ResponsiveLogoGrid
            logos={logos}
            columnsLg={5}
            width={170}
            height={90}
            onClickLogo={(logoUrl) => {
              navigate(`/universe/${logoUrl}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
