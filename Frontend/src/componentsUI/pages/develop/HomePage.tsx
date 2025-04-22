import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import Banner from "../../components/develop/Banner";
import AdvertSlider from "../../containers/develop/AdvertSlider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAllAdvertsQuery } from "@/services/advertsApi";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { logosBanner } from "../../containers/develop/MockData";
import { selectBrands, selectUniverses } from "@/store/selectors/optionsSelectors";
import BrandCarousel from "../../components/develop/BrandCarousel";
import NoResults from "@/componentsUI/elements/noResults";

export default function HomePage() {
  const navigate = useNavigate();

  const skip = 6;
  const [position, setPosition] = useState<number>(1);

  const filterProducts: FilterAdverts = {
    page: position,
    limit: skip,
  };

  const { data: adverts, isLoading, isError, error} =
    useGetAllAdvertsQuery(filterProducts);

  const brands = useSelector((state: RootState) => selectBrands(state));
  const universe = useSelector((state: RootState) => selectUniverses(state));

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  console.log(isError)


  if (universe) {
    return (
      <MainLayout>
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
            <BrandCarousel
              logos={brands || []}
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

        <div className="max-w-7xl mx-auto space-y-10 px-4 mt-8">
          
         { adverts && adverts.adverts.length > 0 ? (
          <>          
          <AdvertSlider title="Nuevos lanzamientos" products={adverts?.adverts || []} />
          <AdvertSlider title="Recomendados para ti" products={adverts?.adverts || []} />
          <AdvertSlider title="Ver todos los artículos" products={adverts?.adverts || []} />
          </>
        ) : (
          <NoResults />
        )
        }
        </div>
      </MainLayout>
    );
  }

  return null;
}
