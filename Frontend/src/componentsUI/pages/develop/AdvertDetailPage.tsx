import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import MainLayout from "@/componentsUI/layouts/develop/MainLayout";
import AdvertDetail from "@/componentsUI/containers/develop/AdvertDetail"
import AdvertSlider from "@/componentsUI/containers/develop/AdvertSlider";
import Editadvert from "@/temporal-components/EditAdvert";
import { RootState } from "@/store/store";
import { selectAdvertBySlug, selectAdverts } from "@/store/selectors/advertsSelectors";
import { setSelectedAdvert, setSelectedAdvertAndLoad } from "@/store/slices/advertsSlice";
import { useDeleteAdvertMutation, useGetAdvertDetailQuery } from "@/services/advertsApi";
import { useRemoveAdvertFavMutation, useSetAdvertFavMutation } from "@/services/usersApi";
import  { mockProducts }  from "@/componentsUI/elements/MockProductos"

function AdvertDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();
  const allAdverts = useSelector(selectAdverts).adverts;


  let advert = useSelector((state: RootState) =>
    selectAdvertBySlug(slug)(state)
  );

  const navigate = useNavigate();

  const {
    data: newAdvert,
    isLoading,
    isError,
    isSuccess,
  } = useGetAdvertDetailQuery(
    { slug: slug || "" },
    { skip: advert?.slug === slug }
  );

  const [deleteAdvert,{isError:isDeleteError, isLoading:isDeleteLoading}] = useDeleteAdvertMutation()
  const [setFavAdvert,{isError:isFavError, isLoading:isFavLoading}] = useSetAdvertFavMutation()
  const [deleteFavAdvert,{isError:isFavDeleteError, isLoading:isFavDeleteLoading}] = useRemoveAdvertFavMutation()
  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    if (slug && !advert) {
      if (newAdvert && isSuccess) {
        dispatch(setSelectedAdvertAndLoad(newAdvert));
      }}

    if (advert && slug && slug === advert.slug) {
      dispatch(setSelectedAdvert(advert));
    }

    if (isError) {
      navigate("/");
    }}, [slug, advert, newAdvert, isSuccess, isError, navigate, dispatch]);

    const relatedAdverts = useMemo(() => {
      if (!advert) return [];
      return allAdverts.filter(
        (a) => a.universe === advert.universe && a._id !== advert._id
      );
    }, [allAdverts, advert]);

    // para normalizar el mock de productos , ya que no se tienen elementos suficientes apra renderizar el slider
    // una vez que se tengan productos, se puede elimianr esta linea
  

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = async () => {
    if(advert){
    try {
      await deleteAdvert({id:advert._id}).unwrap();
      navigate("/")
      console.log("Anuncio eliminado");
    } catch (err) {
      console.log("Error al eliminar");
    }}
  };

  const handleFav= async () => {
    if(advert){
    try {
      const listingId = advert._id
      await setFavAdvert(listingId).unwrap();
      navigate("/")
      console.log("Anuncio favorito");
    } catch (err) {
      console.log("Error al marcar como favorito");
    }}
  };

  const handleDeleteFav= async () => {
    if(advert){
    try {
      const listingId = advert._id
      await deleteFavAdvert(listingId).unwrap();
      navigate("/")
      console.log("Anuncio favorito");
    } catch (err) {
      console.log("Error al marcar como favorito");
    }}
  };


  if (isLoading || isDeleteLoading || isFavLoading|| isFavDeleteLoading) return <p>Loading...</p>;
  if (isError || isDeleteError || isFavError || isFavDeleteError) return <p>Error al cargar el anuncio</p>;
 

  const mockImages = [
    "/adverts/foto0.jpg",
    "/adverts/foto1.jpg",
    "/adverts/foto2.jpg",
    "/adverts/foto3.jpg",
    "/adverts/foto4.jpg",
    "/adverts/foto5.jpg",
  ];

  return advert ? (
    <MainLayout>
  {/*}  isEdit ? (
      <Editadvert />
    ) : */}
     

    {/*revisar esta linea cuando el back end regrese las iamgenes
    //images={advert.images}
    */}
    
      <AdvertDetail
          title={advert.title}
          description={advert.description}
          price={advert.price}
          status={advert.status as "available" | "reserved" | "sold"}
          images={mockImages}
          tags={advert.tags}
          transaction={advert.transaction}
          universe={advert.universe}
          collection={advert.collection}
          product_type={advert.product_type}
          manufacturer={advert.brand}
          condition={advert.condition as "new" | "used" | "broken"}
          author={
            typeof advert.user === "object"
              ? {
                  username: advert.user.username,
                  avatarUrl: advert.user.avatar ?? "",
                  rating: advert.user.rating,
                  userId: advert.user._id,
                }
              : {
                  username: "anónimo",
                  avatarUrl: "",
                  rating: undefined,
                  userId: advert.user, // sigue siendo el ID como string
                }
          }
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddToFav={handleFav}
          onRemoveFromFav={handleDeleteFav}
        />
        <section className="mt-10 px-4 space-y-4">
          <h3 className="text-lg font-semibold text-darkblue">
            Artículos del Universo {advert.universe}
          </h3>
          <AdvertSlider
            title="Más del universo"
            products={relatedAdverts.length > 0 ? relatedAdverts : mockProducts}
          />
        </section>

    </MainLayout>
  ) : (
    <p>No existe el anuncio</p>
  );
}

export default AdvertDetailPage;
