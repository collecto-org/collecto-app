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
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ModalLogin from "@/componentsUI/containers/develop/ModalLogin";

export default function HomePage() {
  const navigate = useNavigate();
  const filter = useSelector(selectFilters);

  const universe = useSelector((state: RootState) => selectUniverses(state));
  const brands = useSelector((state: RootState) => selectBrands(state));
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const {
    data: adverts,
    isLoading,
    isError,
  } = useGetAllAdvertsQuery(
    { ...filter, universe: "", brand: "" },
    { skip: !universe || !!filter.title }
  );

  console.count("useGetAllAdvertsQuery call");
  const { data: filterAdverts } = useFilterAdvertsQuery(filter, {
    skip: !filter.title,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (universe && brands) {
    return (
      <>
        <div className="pt-8">
          <Banner
            backgroundImages={logosBanner}
            text="Inicia tu búsqueda dentro del universo exacto"
            highlights={["búsqueda", "universo"]}
            height="h-70 md:h-96"
            logos={universe}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <section className="my-4">
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
          </section>
        </div>
        {filter.title ? (
          <FilteredAdvertSectionProps
            headerLabel="¿ Qúe estás buscando?"
            label={filter.title}
            adverts={
              filterAdverts ? filterAdverts : { adverts: [], total: "0" }
            }
          />
        ) : (
          <div className="max-w-7xl mx-auto space-y-10 px-4 mt-8">
            {adverts && adverts?.adverts.length > 0 && !isError ? (
              <>
                <AdvertSlider
                  title="Nuevos lanzamientos"
                  adverts={adverts ?? { adverts: [], total: "0" }}
                />
                <AdvertSlider
                  title="Recomendados para ti"
                  adverts={adverts ?? { adverts: [], total: "0" }}
                />
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
