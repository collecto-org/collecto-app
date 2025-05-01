import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Advert } from "@/services/schemas/AdvertsSchemas";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";
import useRefreshFavorites from "../../../hooks/useRefreshFavorites";
import { toast } from "react-toastify";

interface AdvertCardProps extends Advert {
  
openLoginModal: () => void;

}

export default function AdvertCard({
  images,
  brand,
  title,
  price,
  slug,
  isFavorite: initialFavorite,
  user:owner,
  _id,
  openLoginModal
}: AdvertCardProps) {
 

  const [isFavorite, setIsFavorite] = useState(initialFavorite || false);
  const user = useSelector(selectUser);
  const refreshFavorites = useRefreshFavorites();

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user || !user.isLogged) {
      toast.info(
        <div className="text-center">
          <p className="text-sm mb-2">
            Para guardar este artículo como favorito, debes iniciar sesión.
          </p>
          <button
              onClick={() => {
                console.log("abrir modal login");
                openLoginModal();
              }}
            className="px-4 py-1 bg-coral text-white rounded-full text-xs hover:bg-darkblue transition"
          >
            Ir a login
          </button>
        </div>,
        {
          autoClose: false,
          closeOnClick: false,
        }
      );
      return;
    }
    try {
      await refreshFavorites(_id, isFavorite);
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Error al actualizar favorito:", error);
      toast.error("Hubo un error al actualizar favoritos.");
    }
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
        {/* ❤️ BOTÓN FAVORITO */}
        <button
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-lightgray transition ${owner.username === user.username? "hidden" : null}`}
        >
          {isFavorite ? (
            <FaHeart className="text-coral w-5 h-5" />
          ) : (
            <FaRegHeart className="text-darkblue w-5 h-5" />
          )}
        </button>

        {/* IMAGEN */}
        <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[240px] overflow-hidden bg-white">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* DETALLES */}
        <div className="p-2 sm:p-2.5 md:p-3 text-[11px] sm:text-xs md:text-sm lg:text-sm">
          <p className="text-[10px] sm:text-xs text-coral font-semibold">
            {brand.name}
          </p>
          <p className="text-darkblue leading-tight line-clamp-2">{title}</p>
          <p className="text-sm font-semibold text-darkblue mt-1">
            {price.toLocaleString("es-ES", {
              style: "currency",
              currency: "EUR",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
