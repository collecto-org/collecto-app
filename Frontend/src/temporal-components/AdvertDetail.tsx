import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Editadvert from "@/temporal-components/EditAdvert";
import { selectAdvertBySlug } from "@/store/selectors/advertsSelectors";
import { useGetAdvertDetailQuery } from "@/services/advertsApi";
import { RootState } from "@/store/store";
import { setSelectedAdvert, setSelectedAdvertAndLoad } from "@/store/slices/advertsSlice";

function AdvertDetail() {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();
 
  let advert = useSelector((state: RootState) => selectAdvertBySlug((slug))(state));
  const navigate = useNavigate();

  const { data: newAdvert, isLoading, isError, isSuccess } = useGetAdvertDetailQuery({ slug: slug || "" }, { skip: advert?.slug ===slug });
  const [isEdit,setEdit] = useState(false)
  useEffect(() => {
    if (slug && !advert) {
      if (newAdvert && isSuccess) {
        dispatch(setSelectedAdvertAndLoad(newAdvert));
      }
    }

    if (advert && slug && slug === advert.slug) {
      dispatch(setSelectedAdvert(advert));
    }

    if (isError) {
      navigate("/"); 
    }
  }, [slug, advert, newAdvert, isSuccess, isError, navigate, dispatch]);

  const handleEdit = ()=>{
    setEdit(true)
  }
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error al cargar el anuncio</p>;
console.log(advert,newAdvert)
return advert ? (
  isEdit ? (
    <Editadvert />
  ) : (
    <div>
      <h1 className="material-symbols-outlined text-darkblue">{advert.title}</h1>
      <p className="material-symbols-outlined text-darkblue">{advert.description}</p>
      <button onClick={handleEdit}>editar</button>
    </div>
  )
) : (
  <p>No existe el anuncio</p>
);
}

export default AdvertDetail;
