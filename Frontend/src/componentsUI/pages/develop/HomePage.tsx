import Banner from "../../components/develop/Banner";
import AdvertSlider from "../../containers/develop/AdvertSlider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  useFilterAdvertsQuery,
  useGetAllAdvertsQuery,
} from "@/services/advertsApi";
import {
  selectBrands,
  selectUniverses,
} from "@/store/selectors/optionsSelectors";
import BrandCarousel from "../../components/develop/BrandCarousel";
import NoResults from "@/componentsUI/elements/NoResults";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";

import { useGetMyFavAdvertsQuery } from "@/services/advertsApi";
import { useEffect, useRef, useState } from "react";
import { setFilter } from "@/store/slices/advertsSlice";
import { selectUser } from "@/store/selectors/userSelectors";

export default function HomePage() {
  const navigate = useNavigate();
  const filter = useSelector(selectFilters);
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
  

  const universe = useSelector((state: RootState) => selectUniverses(state));
  const brands = useSelector((state: RootState) => selectBrands(state));
  
  const [isAdvertsCall,setAdvertsCall] = useState(true)
  const {
    data: adverts,
    isLoading,
    isError,
  } = useGetAllAdvertsQuery(
    { ...filter, universe: "", brand: "" },
    { skip: !universe || !!filter.title || !!filter.product_type ||  !isAdvertsCall}
  );

  const { data: filterAdverts } = useFilterAdvertsQuery(
    { ...filter, universe: undefined },
    {
      skip: !filter.searchTerm && !filter.product_type,
    }
  );
  const [isFavCall,setFavCall] = useState(true)
  const isFirstRender = useRef(true);


  const [favPage, setFavPage] = useState(1);
  const favFilter = { ...filter, page: favPage, limit: 10 };
  
  const { data: userFavorites } = useGetMyFavAdvertsQuery(favFilter, {
    skip: !user.username || !isFavCall && !isFirstRender.current,
  });
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;      
    }
  }, []);

  
    useEffect(() => {
      if (filter.limit !== 12 || filter.page !== 1) {
        dispatch(setFilter({ limit: 12, page: 1 }));
      }
    }, [dispatch]);


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (universe && brands) {
    return (
      <>
        <div className="pt-8">
          <Banner
            backgroundImages={universe}
            text="Inicia tu búsqueda dentro de un universo"
            highlights={["búsqueda", "universo"]}
            height="h-70 md:h-96"
            logos={universe}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <section className="my-4">
            <BrandCarousel
              logos={brands}
              title="Encuentra lo mejor de tus marcas favoritas"
              width={90}
              height={90}
              onClickLogo={(src) => {
                const slug = src
                  .split("/")
                  .pop()
                  ?.replace(".svg", "")
                  .toLowerCase();
                navigate(`/universe/${slug}`);
              }}
            />
          </section>
        </div>
        {filter.searchTerm || filter.product_type ? (
          <div className="max-w-7xl mx-auto px-4 pt-10">
          <FilteredAdvertSectionProps
            headerLabel="¿Qúe estás buscando?"
            label={filter.searchTerm || ""}
            adverts={
              filterAdverts ? filterAdverts : { adverts: [], total: "0" }
            }
          />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-10 px-4 mt-8">
            {adverts && adverts?.adverts.length > 0 && !isError ? (
              <>
                <AdvertSlider setCall={setAdvertsCall}
                  title="Nuevos lanzamientos"
                  adverts={adverts ?? { adverts: [], total: "0" }}
                />
                {userFavorites && userFavorites.adverts?.length > 0 && (
                  <AdvertSlider setCall={setFavCall}  setAditionalFilter={setFavPage}
                    title="Tus productos favoritos"
                    adverts={userFavorites}
                  />
                )}
                <AdvertSlider setCall={setAdvertsCall}
                  title="Ver todos los artículos"
                  adverts={adverts ?? { adverts: [], total: "0" }}
                />
              </>
            ) : (
              <NoResults />
            )}
          </div>
        )}
      </>
    );
  }

  return null;
}

HomePage.whyDidYouRender = true;
