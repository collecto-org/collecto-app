import MainLayout from "../../layouts/MainLayout";
import Banner from "../../components/develop/Banner";
import AdvertSlider from "../../containers/develop/AdvertSlider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useFilterAdvertsQuery, useGetAllAdvertsQuery } from "@/services/advertsApi";

import { logosBanner } from "../../containers/develop/MockData";
import { selectBrands, selectUniverses } from "@/store/selectors/optionsSelectors";
import BrandCarousel from "../../components/develop/BrandCarousel";
import NoResults from "@/componentsUI/elements/noResults";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";

import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { useState } from "react";
import { ApiError } from "@/services/schemas";





export default function HomePage() {
  const navigate = useNavigate();
  const filter = useSelector(selectFilters)

  const { data: adverts, isLoading, isError, error} =
    useGetAllAdvertsQuery(filter);

    const { data: filterAdverts, } =
    useFilterAdvertsQuery(filter,{skip:!filter.title});




  const universe = useSelector((state: RootState) => selectUniverses(state));
  const brands = useSelector((state: RootState) => selectBrands(state));

  if (isError) {
  }


  if (isLoading) {
    return <p>Cargando...</p>;
  }


  if (universe && brands) {
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

{filter.title ? (
  <FilteredAdvertSectionProps
    headerLabel="¿ Qúe estás buscando?"
    label={filter.title}
    adverts={filterAdverts ? filterAdverts.adverts : []}
  />
) : (
  <div className="max-w-7xl mx-auto space-y-10 px-4 mt-8">
    {adverts ? (
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

</MainLayout>
    );
  }


  return null;

}
