import { Advert } from "@/services/schemas/AdvertsSchemas";
import React, { useState } from "react";

interface ProductCardProps { //desuso
  imageUrl: string;
  brand: string;
  name: string;
  price: string;
}

export default function ProductCard({
  images,
  brand,
  title,
  price,
}: Advert) {
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(  images,
    brand,
    title,
    price,)

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div
      className="relative rounded-xl border-2 border-turquoise overflow-hidden shadow-sm transition hover:shadow-md bg-white max-w-7xl mx-auto w-full"
      style={{ width: "180px", height: "325px" }}
    >
      {/* ❤️ BOTÓN FAVORITO (con TailwindCSS) */}
      <button
        onClick={toggleFavorite}
        aria-label="Agregar a favoritos"
        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition ${
          isFavorite ? "bg-coral text-white" : "bg-white text-darkblue"
        }`}
      >
        <span
          className="material-symbols-outlined text-darkblue"
          style={{
            fontVariationSettings: '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
            fontSize: "24px",
            lineHeight: "1",
          }}
        >
          {isFavorite ? "on" : "off"}
        </span>
      </button>

      {/* IMAGEN */}
      <div className="relative w-full h-60 overflow-hidden bg-white">
        <img
          src={`/images/${images[0]}`}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* DETALLES */}
      <div className="p-2 pb-2 bg-white text-sm">
        <p className="text-xs text-coral font-semibold">{brand}</p>
        <p className="text-darkblue leading-none line-clamp-2">{title}</p>
        <p className="text-sm font-semibold text-darkblue mt-1">{price}</p>
      </div>
    </div>
  );
}
