import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdvertDetail from "@/componentsUI/containers/develop/AdvertDetail";
import AdvertSlider from "@/componentsUI/containers/develop/AdvertSlider";
import { RootState } from "@/store/store";
import {
  useDeleteAdvertMutation,
  useFilterAdvertsQuery,
  useGetAdvertDetailQuery,
} from "@/services/advertsApi";
import {
  useRemoveAdvertFavMutation,
  useSetAdvertFavMutation,
} from "@/services/advertsApi"
import { selectUser } from "@/store/selectors/userSelectors";
import Editadvert from "@/temporal-components/EditAdvert";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import ModalLogin from "@/componentsUI/containers/develop/ModalLogin";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";
import NotFoundPage from "@/componentsUI/components/develop/NotFoundPage";
import MessageBanner from "@/componentsUI/elements/MessageBanner";
import BannerPages from "@/componentsUI/components/develop/BannerPages"; // ✅ importamos el banner

function AdvertDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const location = useLocation();
  const user = useSelector((state: RootState) => selectUser(state));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: advert,
    refetch,
    isLoading: isAdvertLoading,
  } = useGetAdvertDetailQuery({ slug: slug || "" });

  const universeProduct = advert?.universe._id;
  const filter = useSelector((state: RootState) => selectFilters(state));

  const { data: relatedAdverts } = useFilterAdvertsQuery(
    {
      ...filter,
      universe: universeProduct,
      product_type:undefined
    },
    {
      skip: !universeProduct,
    }
  );

  const [deleteAdvert, { isSuccess: isDeleteSucess }] =
    useDeleteAdvertMutation();
  const [setFavAdvert, { isError: isFavError }] = useSetAdvertFavMutation();
  const [deleteFavAdvert, { isError: isDelete }] = useRemoveAdvertFavMutation();
  const [notificationDelete] = useRemoveAdvertFavMutation();

  const [returnPath, setReturnPath] = useState(location.pathname);

  const isOwner = user.username === advert?.user.username;
  const isSold = advert?.status.code === "sold";
  const isReserved = advert?.status.code === "reserved";

  const [isEdit, setEdit] = useState(false);
  const handleEdit = () => {
    if (user && advert && user.username === advert.user.username) {
      setEdit(!isEdit);
    }
  };

  const handleDelete = async () => {
    if (user && advert && user.username === advert.user.username) {
      await deleteAdvert({ id: advert._id });
      await notificationDelete(advert._id);
    }
  };

  useEffect(() => {
    if (isDeleteSucess) {
      navigate("/");
    }
  }, [isDeleteSucess]);

  const [isFavorite, setFavorite] = useState(false);

  useEffect(() => {
    if (advert?.isFavorite !== undefined) {
      setFavorite(advert.isFavorite);
    }
  }, [advert]);

  useEffect(() => {
    if (location.state?.showLoginModal) {
      setIsLoginModalOpen(true);
    }
  }, [location.state]);

  const handleFav = async () => {
    if (!advert) return;
    try {
      if (!user.username) {
        setIsLoginModalOpen(true);
      }
      if (!isFavorite) {
        await setFavAdvert(advert._id).unwrap();
        setFavorite(true);
      } else if (advert.isFavorite || isFavorite) {
        await deleteFavAdvert(advert._id).unwrap();
        setFavorite(false);
      }
    } catch (err) {
      console.error("Error al cambiar favorito", err);
    }
  };

  if (isAdvertLoading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6 text-center">
        <LoadingSpinner />
      </div>
    );

  if (!advert) return <NotFoundPage />;

  if (isEdit) {
    return (
      <Editadvert refetch={refetch} handleEdit={handleEdit} advert={advert} />
    );
  }

  return (
    <>
      {isLoginModalOpen && (
        <ModalLogin
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onRecoverPassword={() => {}}
          onRegister={() => {}}
          returnPath={returnPath}
        />
      )}

      <div className="pt-10 md:pt-14">
        <BannerPages
          backgroundImages={[
            advert?.universe?.slug
              ? `/gridImages/${advert.universe.slug}.jpg`
              : "/gridImages/collecto-banner-principal.jpg",
          ]}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <AdvertDetail
          advert={advert}
          onEdit={isOwner && !isSold ? handleEdit : undefined}
          onDelete={isOwner && !isSold ? handleDelete : undefined}
          onToggleFav={!isOwner ? handleFav : undefined}
          isFavorite={isFavorite}
          onForceLogin={(path) => {
            setIsLoginModalOpen(true);
            setReturnPath(path || location.pathname);
          }}
        />

        {isFavError && (
          <MessageBanner
            type="error"
            text="Error al añadir el artículo a favoritos"
          />
        )}
        {isDelete && (
          <MessageBanner type="error" text="Error al eliminar el artículo" />

        )}

        <section className="mt-10 space-y-4">
          {/* <h3 className="text-lg font-semibold text-darkblue">
            Más Artículos del Universo {advert.universe.name}
          </h3> */}
          {relatedAdverts ? (
            <AdvertSlider
              title="También te puede interesar"
              adverts={relatedAdverts}
            />
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </div>
    </>
  );
}

export default AdvertDetailPage;
