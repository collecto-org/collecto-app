import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Advert } from "@/services/schemas/AdvertsSchemas";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";
import useRefreshFavorites from "@/hooks/useRefreshFavorites";
import useToggleReserved from "@/hooks/useToggleReserved";
import { toast } from "react-toastify";
import ModalLogin from "@/componentsUI/containers/develop/ModalLogin";
import ModalRecoverPassword from "@/componentsUI/containers/develop/ModalRecoverPassword";
import ModalConfirmEmailSent from "@/componentsUI/containers/develop/ModalConfirmEmailSent";
import ModalRegister from "@/componentsUI/containers/develop/ModalRegister";

export default function AdvertCard({
  images,
  brand,
  title,
  price,
  slug,
  status,
  isFavorite: initialFavorite,
  user: owner,
  _id,
}: Advert) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite || false);
  const isReservedBackend = status.code?.toLowerCase() === "reserved";
  const [isReservedLocal, setIsReservedLocal] = useState(isReservedBackend);
  const isSold = status.code?.toLowerCase() === "sold";
  const location = useLocation();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRecoverPasswordOpen, setIsRecoverPasswordOpen] = useState(false);
  const [isConfirmEmailSentOpen, setIsConfirmEmailSentOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRecoverPasswordModal = () => {
    setIsLoginModalOpen(false);
    setIsRecoverPasswordOpen(true);
    setIsConfirmEmailSentOpen(false);
  };

  const openConfirmEmailSentModal = () => {
    setIsRecoverPasswordOpen(false);
    setIsConfirmEmailSentOpen(true);
  };

  const closeAllModals = () => {
    window.history.replaceState({}, "", location.pathname + location.search);
    setIsLoginModalOpen(false);
    setIsLoginModalOpen(false);
    setIsRecoverPasswordOpen(false);
    setIsConfirmEmailSentOpen(false);
  };

  useEffect(() => {
    if (location.state?.showLoginModal) {
      setIsLoginModalOpen(true);
    }
  }, [location.state]);

  const user = useSelector(selectUser);
  const refreshFavorites = useRefreshFavorites();
  const toggleReserved = useToggleReserved();

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user.username) {
      setIsLoginModalOpen(true);
    } else {
      try {
        await refreshFavorites(_id, isFavorite);
        setIsFavorite((prev) => !prev);
      } catch (error) {
        console.error("Error al actualizar favorito:", error);
        toast.error("Hubo un error al actualizar favoritos.");
      }
    }
  };

  const handleReservedClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user || !user.isLogged || user.username !== owner?.username) {
      toast.info(
        "Solo el propietario puede marcar este artículo como reservado."
      );
      return;
    }

    try {
      await toggleReserved(_id, isReservedLocal);
      setIsReservedLocal((prev) => !prev); // ✅ actualización visual inmediata
    } catch (error) {
      console.error("Error al actualizar reservado:", error);
      toast.error("Hubo un error al actualizar el estado de reservado.");
    }
  };

  const isOwner =
    user?.username && owner?.username && user.username === owner.username;

  return (
    <>
      {/* ✅ Modal fuera del <Link> */}
      {isLoginModalOpen && (
        <ModalLogin
          isOpen={isLoginModalOpen}
          returnPath={location.state?.from?.pathname || "/"}
          onClose={closeAllModals}
          onRecoverPassword={openRecoverPasswordModal}
          onRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      )}

      {isRecoverPasswordOpen && (
        <ModalRecoverPassword
          isOpen={isRecoverPasswordOpen}
          onClose={closeAllModals}
          onSuccess={openConfirmEmailSentModal}
        />
      )}

      {isConfirmEmailSentOpen && (
        <ModalConfirmEmailSent
          isOpen={isConfirmEmailSentOpen}
          onClose={closeAllModals}
        />
      )}

      {isRegisterModalOpen && (
        <ModalRegister
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}
      <Link to={`/adverts/${slug}`}>
        <div
          className={`
          relative rounded-xl border-2 border-turquoise overflow-hidden shadow-sm transition hover:shadow-md bg-white
          w-[120px] h-[230px]
          sm:w-[150px] sm:h-[270px]
          md:w-[160px] md:h-[290px]
          lg:w-[200px] lg:h-[330px]
        `}
        >
          {/* 📍 BOTÓN RESERVADO SOLO PARA DUEÑO */}
          {isOwner && (
            <button
              onClick={handleReservedClick}
              className="absolute top-2 left-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-lightgrey transition"
            >
              {isReservedLocal ? (
                <FaBookmark className="text-turquoise w-5 h-5" />
              ) : (
                <FaRegBookmark className="text-darkblue w-5 h-5" />
              )}
            </button>
          )}

          {/* ❤️ FAVORITO SOLO SI NO SOY DUEÑO */}
          {!isOwner && (
            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-lightgrey transition"
            >
              {isFavorite ? (
                <FaHeart className="text-coral w-5 h-5" />
              ) : (
                <FaRegHeart className="text-darkblue w-5 h-5" />
              )}
            </button>
          )}

          {/* IMAGEN */}
          <div className="relative w-full h-[140px] sm:h-[180px] md:h-[200px] lg:h-[230px] overflow-hidden bg-white">
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />

            {/* Banner VENDIDO */}
            {isSold && (
              <div className="absolute bottom-0 left-0 w-full bg-green-600 text-white text-center py-2 text-xs sm:text-sm">
                Vendido
              </div>
            )}

            {/* Banner RESERVADO */}
            {isReservedLocal && !isSold && (
              <div className="absolute bottom-0 left-0 w-full bg-turquoise text-white text-center py-2 text-xs sm:text-sm">
                Reservado
              </div>
            )}
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
    </>
  );
}
