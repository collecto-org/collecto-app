import Banner from "../../components/develop/Banner";
import AdvertSlider from "../../containers/develop/AdvertSlider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  useFilterAdvertsQuery,
  useGetAllAdvertsQuery,
} from "@/services/advertsApi";
import { logosBanner } from "../../containers/develop/MockData";
import {
  selectBrands,
  selectUniverses,
} from "@/store/selectors/optionsSelectors";
import BrandCarousel from "../../components/develop/BrandCarousel";
import NoResults from "@/componentsUI/elements/NoResults";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";
import { useGetMyFavAdvertsQuery } from "@/services/usersApi";



export default function HomePage() {
  const navigate = useNavigate();
  const filter = useSelector(selectFilters);
  
  const universe = useSelector((state: RootState) => selectUniverses(state));
  const brands = useSelector((state: RootState) => selectBrands(state));

  const {
    data: adverts,
    isLoading,
    isError,

  } = useGetAllAdvertsQuery({...filter,universe:undefined,brand:undefined},{skip:!universe ||!!filter.title || !!filter.product_type || !!filter.searchTerm} );

  console.count("useGetAllAdvertsQuery call");
  const { data: filterAdverts } = useFilterAdvertsQuery({...filter,universe:undefined}, {
    skip: !filter.searchTerm && !filter.product_type,
  });

  const {data : userFavorites} = useGetMyFavAdvertsQuery(filter)

  console.log(filterAdverts)


  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (universe && brands) {
    return (
      <>

        <div className="pt-8">
          <Banner
            backgroundImages={logosBanner}
            text="Estás a una búsqueda de completar tu colección"
            highlights={["búsqueda", "colección"]}
            height="h-70 md:h-96"
            logos={universe}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <section className="my-4">
            {/*
          
                  <FilteredAdvertSectionProps
                        headerLabel="Universo"
                        label= "STAR WARS" 
                        totalAdverts={totalitems}
                        onFilterChange={(page, size) => {
                          setCurrentPage(page),
                          setPageSize(size)
                        }}
                        barsidetitle="Tipo de producto"
                        barsideoptions={sideBarMenu}
                        adverts={adverts}
                  />
          */}

            <BrandCarousel
              logos={brands}
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

            {/* <ImageGrid
            logos={brandLogos}
            columns={10}
            width={90}
            height={90}
            // onClickLogo={(src) => {
            //   const slug = src
            //     .split("/")
            //     .pop()
            //     ?.replace(".svg", "")
            //     .toLowerCase();
            //   navigate(`/universe/${slug}`);
            // }}
          /> */}
          </section>
        </div>
        {filter.searchTerm || filter.product_type? (
          <FilteredAdvertSectionProps
            headerLabel="¿ Qúe estás buscando?"
            label={filter.searchTerm || ""}
            adverts={filterAdverts ? filterAdverts : {adverts:[],total:"0"}}
          />
        ) : (
          <div className="max-w-7xl mx-auto space-y-10 px-4 mt-8">
            { adverts && adverts?.adverts.length >0 && !isError  ? (
              <>
                <AdvertSlider
                  title="Nuevos lanzamientos"
                  adverts={adverts ?? { adverts: [], total: "0" }}
                />
                {userFavorites && userFavorites.adverts?.length > 0 && (
  <AdvertSlider
    title="Tus productos favoritos"
    adverts={userFavorites}
  />
)}
                <AdvertSlider
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
