import { useEffect, useState } from "react";
import ImageGrid from "../../components/develop/ImageGrid";
import HighlightedText from "../../elements/HighlightedText";
import ResponsiveImage from "../develop/ResponsiveImage";
import ResponsiveLogoGrid from "../../components/develop/ResponsiveLogoGrid";

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
  const mainImage = "/gridImages/collecto-banner-principal.jpg";
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [fade, setFade] = useState(true);

  // 🔄 Función para elegir una imagen aleatoria distinta a la actual
  const getRandomImage = (current: string) => {
    const otherImages = backgroundImages.filter((img) => img !== current);
    return otherImages[Math.floor(Math.random() * otherImages.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextImage = getRandomImage(currentImage);

      // fade-out → cambio imagen → fade-in
      setFade(false);
      setTimeout(() => {
        setCurrentImage(nextImage);
        setFade(true);
      }, 500); // espera antes de mostrar nueva imagen
    }, 10000); // cada 10 segundos

    return () => clearInterval(interval); // cleanup
  }, [currentImage, backgroundImages]);

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
          <h2 className="text-xl md:text-2xl font-bold pb-4 pt-8">
            <HighlightedText text={text} highlights={highlights} />
          </h2>
          <ResponsiveLogoGrid
            logos={logos}
            columnsLg={5}
            width={170}
            height={90}
            onClickLogo={(src) => {
              const slug = src
                .split("/")
                .pop()
                ?.replace(".png", "")
                .toLowerCase();
              window.location.href = `/universe/${slug}`;
            }}
          />

          {/* <ImageGrid
            logos={logos}
            columns={5}
            width={160}
            height={80}
            onClickLogo={(src) => {
              const slug = src
                .split("/")
                .pop()
                ?.replace(".png", "")
                .toLowerCase();
              window.location.href = `/universe/${slug}`;
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}
