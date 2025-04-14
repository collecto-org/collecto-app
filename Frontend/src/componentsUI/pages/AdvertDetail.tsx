import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { setSelectedAdvert } from "../../store/slices/advertsSlice";
import { selectSelectedAdvert } from "../../store/selectors/advertsSelectors";
import { RootState } from "../../store/store";
import { useGetAdvertDetailQuery } from "../../services/advertsApi";

function AdvertDetail() {
  const params = useParams();
  const slug = params.slug;
  const dispatch = useDispatch();
  const advert = useSelector((state: RootState) => selectSelectedAdvert(state));
  const navigate = useNavigate();

  const { data: newAdvert, isLoading, isError, isSuccess } = useGetAdvertDetailQuery({ slug: slug || "" }, { skip: !!advert && advert.slug === slug });

  useEffect(() => {
    if (slug && !advert) {
      if (newAdvert && isSuccess) {
        dispatch(setSelectedAdvert(newAdvert));
      }
    }

    if (advert && slug && newAdvert && slug !== advert.slug) {
      dispatch(setSelectedAdvert(newAdvert));
    }

    if (isError) {
      navigate("/"); 
    }
  }, [slug, advert, newAdvert, isSuccess, isError, navigate, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error al cargar el anuncio</p>;

  return advert ? (
    <div>
      <h1>{advert.title}</h1>
      <p>{advert.description}</p>
    </div>
  ) : (
    <p>No existe el anuncio</p>
  );
}

export default AdvertDetail;
