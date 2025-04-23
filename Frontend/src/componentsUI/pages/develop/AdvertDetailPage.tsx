import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
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

function AdvertDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => selectUser(state));

  const navigate = useNavigate();
  const {
    data: advert} = useGetAdvertDetailQuery({ slug: slug || "" });
  const universeProduct = advert?.universe._id;

  const filter = useSelector((state:RootState)=>selectFilters(state))
  console.log(universeProduct)

const { data: relatedAdverts } = useFilterAdvertsQuery(
  {
    universe: universeProduct,
    ...filter,
  },
  {
    skip: !universeProduct, // <- no lanzar la query si no hay universo
  }
);

  const [deleteAdvert, {isSuccess: isDeleteSucess,}] = useDeleteAdvertMutation();
  const [setFavAdvert] = useSetAdvertFavMutation();
  const [deleteFavAdvert] = useRemoveAdvertFavMutation();

  const isOwner = user.username === advert?.user.username;

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
        deleteAdvert({ id: advert._id });
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
  const handleFav = async () => {
    if (!advert || !user) return;
    try {
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
   
        <Editadvert advert={advert} />
 
    );
  }

  return advert ? (
    <>
      <AdvertDetail
        advert={advert}
        onEdit={isOwner ? handleEdit : undefined}
        onDelete={isOwner ? handleDelete : undefined}
        onToggleFav={handleFav}
        isFavorite={isFavorite}
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
