import { useDispatch, } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Editadvert from "@/temporal-components/EditAdvert";

import { useDeleteAdvertMutation, useGetAdvertDetailQuery } from "@/services/advertsApi";
import { useRemoveAdvertFavMutation, useSetAdvertFavMutation } from "@/services/usersApi";
import { useNewOrderMutation } from "@/services/ordersApi";

function AdvertDetail() {
  const params = useParams();

  const slug = params.slug;



  const navigate = useNavigate();

  const {
    data: advert,
    isLoading,
    isError,
    isSuccess,
    refetch
  } = useGetAdvertDetailQuery(
    { slug: slug || "" },
    { skip: !slug }
  );

  const [deleteAdvert,{isError:isDeleteError, isLoading:isDeleteLoading}] = useDeleteAdvertMutation()
  const [setFavAdvert,{isError:isFavError, isLoading:isFavLoading}] = useSetAdvertFavMutation()
  const [deleteFavAdvert,{isError:isFavDeleteError, isLoading:isFavDeleteLoading}] = useRemoveAdvertFavMutation()
  const [newOrder] = useNewOrderMutation()
  const [isEdit, setEdit] = useState(false);


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


  const handleBuy= async () => {
    if(advert){
    try {
      const advertId = advert._id
      await newOrder(advertId).unwrap();
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

  return advert ? (
    isEdit ? (
      <Editadvert advert={advert} handleEdit={handleEdit} refetch={refetch}/>
    ) : (
      <div className="text-darkblue">
        <h1 className="material-symbols-outlined text-darkblue">
          {advert.title}
        </h1>
        <p className="material-symbols-outlined text-darkblue">
          {advert.description}
        </p>
        <button onClick={handleEdit}>editar</button>
        <button onClick={handleDelete}>Borrar</button>
        <button onClick={handleDeleteFav}>Eliminar de favoritos</button>
        <button onClick={handleFav}>Añadir a favoritos</button>
        <button onClick={handleBuy}>Comprar</button>

      </div>
    )
  ) : (
    <p>No existe el anuncio</p>
  );
}

export default AdvertDetail;
