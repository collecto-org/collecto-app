import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

import MainLayout from "@/componentsUI/layouts/MainLayout";
import AdvertDetail from "@/componentsUI/containers/develop/AdvertDetail"
import AdvertSlider from "@/componentsUI/containers/develop/AdvertSlider";
import { RootState } from "@/store/store";
import { selectAdvertBySlug, selectAdverts, selectSelectedAdvert } from "@/store/selectors/advertsSelectors";
import { clearSelectedAdvert, setSelectedAdvert, setSelectedAdvertAndLoad } from "@/store/slices/advertsSlice";
import { useDeleteAdvertMutation, useGetAdvertDetailQuery } from "@/services/advertsApi";
import { useRemoveAdvertFavMutation, useSetAdvertFavMutation } from "@/services/usersApi";
import  { mockProducts }  from "@/componentsUI/elements/MockProductos"
import { selectUser } from "@/store/selectors/userSelectors";
import Editadvert from "@/temporal-components/EditAdvert";

function AdvertDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();
  
  const relatedAdverts = useSelector(selectAdverts) // Cuando tengamos anuncios relacionados hay que cambiar el selector

  
  const mocked = true
  const advert = mockProducts[0]; 
  // const advert = useSelector(selectSelectedAdvert);

  const user = useSelector((state: RootState) => selectUser(state));

  const navigate = useNavigate();
  const {
    data: newAdvert,
    isLoading,
    isError,
    isSuccess,
  } = useGetAdvertDetailQuery(
    { slug: slug || "" },
    { skip: advert?.slug === slug || mocked  }
  );

  const [deleteAdvert,{isError:isDeleteError, isLoading:isDeleteLoading,isSuccess:isDeleteSucess}] = useDeleteAdvertMutation()
  const [setFavAdvert,{isError:isFavError, isLoading:isFavLoading}] = useSetAdvertFavMutation()
  const [deleteFavAdvert,{isError:isFavDeleteError, isLoading:isFavDeleteLoading}] = useRemoveAdvertFavMutation()

  const isOwner = user.username === advert?.user.username 

  const [isEdit, setEdit] = useState(false)
  const handleEdit = () =>{
    if (user){
      if(advert && user.username === advert.user.username){
        setEdit(!isEdit)  
      }        
    }
  }

  const handleDelete = async () =>{
    if (user){
      if(advert && user.username === advert.user.username){
        deleteAdvert({id:advert._id})
      }        
    }
  }

  useEffect(() => {
    if (isDeleteSucess) {
      dispatch(clearSelectedAdvert())
      navigate('/');
    }
  }, [isDeleteSucess]);

  const handleFav = async () => {
    if (!advert || !user) return;
  
    try {
      if (!advert.isFavorite) {
        await setFavAdvert(advert._id).unwrap();
      } else {
        await deleteFavAdvert(advert._id).unwrap();
      }
    } catch (err) {
      console.error('Error al cambiar favorito', err);
    }
  };
 
  useEffect(() => {
    if (slug && (advert?.slug !== slug)) {
      if (newAdvert && isSuccess) {
        dispatch(setSelectedAdvertAndLoad(newAdvert));
      }
    }
  
    if (isError) {
      // Puedes redirigir o mostrar error
    }
  }, [slug, advert, newAdvert, isSuccess, isError, dispatch]);

  if (isLoading || isDeleteLoading || isFavLoading|| isFavDeleteLoading) return <p>Loading...</p>;
  if (isError || isDeleteError || isFavError || isFavDeleteError || !advert ) return <p>Error al cargar el anuncio</p>;
 
  if (isEdit) {
    return (
      <MainLayout>
        <Editadvert advert={advert}/>
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
    
      <AdvertDetail advert={advert} onEdit={isOwner ? handleEdit : undefined} onDelete={isOwner ? handleDelete : undefined}  onToggleFav={handleFav} />
        <section className="mt-10 px-4 space-y-4">
          <h3 className="text-lg font-semibold text-darkblue">
            Artículos del Universo {advert.universe}
          </h3>
          <AdvertSlider
            title="Más del universo"
            products={relatedAdverts.adverts.length > 1 ? relatedAdverts.adverts : mockProducts} //cambiar cuando tengamos anuncios relacionados
          />
        </section>

    </MainLayout>
  ) : (
    <p>No existe el anuncio</p>
  );
}

export default AdvertDetailPage;
