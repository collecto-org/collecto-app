import {  useSelector } from "react-redux";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
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
} from "@/services/usersApi";
import { selectUser } from "@/store/selectors/userSelectors";
import Editadvert from "@/temporal-components/EditAdvert";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import ModalLogin from "@/componentsUI/containers/develop/ModalLogin";


function AdvertDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const location = useLocation();
  const user = useSelector((state: RootState) => selectUser(state));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const navigate = useNavigate();
  const {
    data: advert,refetch } = useGetAdvertDetailQuery({ slug: slug || "" },);
    
  const universeProduct = advert?.universe._id;
  const filter = useSelector((state:RootState)=>selectFilters(state))


const { data: relatedAdverts } = useFilterAdvertsQuery(
  {
    universe: universeProduct,
    ...filter,
  },
  {
    skip: !universeProduct,
  }
);

  const [deleteAdvert, {isSuccess: isDeleteSucess,}] = useDeleteAdvertMutation();
  const [setFavAdvert] = useSetAdvertFavMutation();
  const [deleteFavAdvert] = useRemoveAdvertFavMutation();
  const [notificationDelete] = useRemoveAdvertFavMutation()
  const [returnPath, setReturnPath] = useState(location.pathname);

  const isOwner = user.username === advert?.user.username;
  const isSold =  advert?.status.code === "sold";

  const [isEdit, setEdit] = useState(false);
  const handleEdit = () => {
    if (user) {
      if (advert && user.username === advert.user.username) {
        setEdit(!isEdit);
      }
    }
  };

  const handleDelete = async () => {
    if (user) {
      if (advert && user.username === advert.user.username) {
        await deleteAdvert({ id: advert._id });
        await notificationDelete(advert._id)
        
      }
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
    if(location.state?.showLoginModal){
      setIsLoginModalOpen(true)
    }
  }, [location.state])

  const handleFav = async () => {
   
    if (!advert) return;
    try {
      if(!user.username){
        setIsLoginModalOpen(true);
      }
      if (!isFavorite) {
        await setFavAdvert(advert._id).unwrap();
        setFavorite(true);
      } else if(advert.isFavorite || isFavorite) {
        await deleteFavAdvert(advert._id).unwrap();
        setFavorite(false);
      }
    } catch (err) {
      console.error("Error al cambiar favorito", err);
    }
  };

  if (!advert) return <p>Cargando anuncio...</p>;
  if (isEdit) {
    return (
   
        <Editadvert refetch={refetch} handleEdit={handleEdit} advert={advert} />
 
    );
  }

  return advert ? (
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
      <AdvertDetail
        advert={advert}
        onEdit={isOwner && !isSold ? handleEdit : undefined}
        onDelete={isOwner  && !isSold ? handleDelete : undefined}
        onToggleFav={!isOwner ? handleFav: undefined}
        isFavorite={isFavorite}
        onForceLogin={(path) => {
          setIsLoginModalOpen(true),
          setReturnPath(path || location.pathname)}}
      />
      <section className="mt-10 px-4 space-y-4">
        <h3 className="text-lg font-semibold text-darkblue">
          Artículos del Universo {advert.universe.name}
        </h3>
        {relatedAdverts?(
        <AdvertSlider
          title="Más del universo"
          adverts={relatedAdverts}
        />): <p>Loading...</p>}
      </section>
    </>
  ) : (
    <p>No existe el anuncio</p>
  );
}

export default AdvertDetailPage;
