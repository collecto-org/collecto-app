import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import MainLayout from "@/componentsUI/layouts/MainLayout";
import AdvertDetail from "@/componentsUI/containers/develop/AdvertDetail";
import AdvertSlider from "@/componentsUI/containers/develop/AdvertSlider";
import { RootState } from "@/store/store";
import { clearSelectedAdvert } from "@/store/slices/advertsSlice";
import {
  useDeleteAdvertMutation,
  useFilterAdvertsQuery,
  useGetAdvertDetailQuery,
} from "@/services/advertsApi";
import {
  useRemoveAdvertFavMutation,
  useSetAdvertFavMutation,
} from "@/services/usersApi";
import { mockProducts } from "@/componentsUI/elements/MockProductos";
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
  const universeProduct = advert?.universe;

  const filter = useSelector((state:RootState)=>selectFilters(state))
  

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
      dispatch(clearSelectedAdvert());
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
      if (!advert.isFavorite || !isFavorite) {
        await setFavAdvert(advert._id).unwrap();
        setFavorite(true);
      } else {
        await deleteFavAdvert(advert._id).unwrap();
        setFavorite(false);
      }
    } catch (err) {
      console.error("Error al cambiar favorito", err);
    }
  };

  // useEffect(() => {
  //   if (slug && (advert?.slug !== slug)) {
  //     if (newAdvert && isSuccess) {
  //       dispatch(setSelectedAdvertAndLoad(newAdvert));
  //     }
  //   }

  //   if (isError) {
  //     // Puedes redirigir o mostrar error
  //     console.log("error al buscsar el anuncio")
  //   }
  // }, [slug, advert, newAdvert, isSuccess, isError, dispatch]);

  //if (isLoading || isDeleteLoading || isFavLoading|| isFavDeleteLoading) return <p>Loading...</p>;
  // if (isError || isDeleteError || isFavError || isFavDeleteError || !advert ) return <p>Error al cargar el anuncio</p>;
  //if (isError || isDeleteError || isFavError || isFavDeleteError) return <p>Error al cargar el anuncio</p>;
  if (!advert) return <p>Cargando anuncio...</p>;
  if (isEdit) {
    return (
      <MainLayout>
        <Editadvert advert={advert} />
      </MainLayout>
    );
  }

  return advert ? (
    <MainLayout>
      {/*}  isEdit ? (
      <Editadvert />
    ) : */}

      {/*revisar esta linea cuando el back end regrese las iamgenes
    //images={advert.images}
    */}

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
    </MainLayout>
  ) : (
    <p>No existe el anuncio</p>
  );
}

export default AdvertDetailPage;
