import { Advert } from "@/services/schemas/AdvertsSchemas";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({
  images,
  brand,
  title,
  price,
  slug,
}: Advert) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Link to={`/adverts/${slug}`}>
      <div
        className={`
          relative rounded-xl border-2 border-turquoise overflow-hidden shadow-sm transition hover:shadow-md bg-white
          w-[140px] h-[250px]
          sm:w-[160px] sm:h-[280px]
          md:w-[180px] md:h-[310px]
          lg:w-[200px] lg:h-[325px]
        `}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite();
          }}
          aria-label="Agregar a favoritos"
          className={`absolute top-2 right-2 z-10 p-2 rounded-full transition ${
            isFavorite ? "bg-coral text-white" : "bg-white text-darkblue"
          }`}
        >
          <span
            className="material-symbols-outlined text-darkblue"
            style={{
              fontVariationSettings:
                '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
              fontSize: "24px",
              lineHeight: "1",
            }}
          >
            {isFavorite ? "on" : "off"}
          </span>
        </button>

        <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden bg-white">
          <img
            src={`/images/${images[0]}`}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-2 sm:p-2.5 md:p-3 text-[11px] sm:text-xs md:text-sm lg:text-sm">
          <p className="text-[10px] sm:text-xs text-coral font-semibold">
            {brand}
          </p>
          <p className="text-darkblue leading-tight line-clamp-2">{title}</p>
          <p className="text-sm font-semibold text-darkblue mt-1">{price}</p>
        </div>
      </div>
    </Link>
  );
}
