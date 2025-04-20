import MainLayout from "../../layouts/MainLayout";
import Banner from "../../components/develop/Banner";
import ImageGrid from "../../components/develop/ImageGrid";
import AdvertSlider from "../../containers/develop/AdvertSlider";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAllAdvertsQuery } from "@/services/advertsApi";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { useEffect, useState } from "react";
import { ApiError } from "@/services/schemas";
import { logosBanner, universeLogos, sideBarMenu } from "../../containers/develop/MockData"
import { useGetBrandsQuery } from "@/services/brandsApi";
import { useGetUniversesQuery } from "@/services/universesApi";




export default function HomePage() {
  const navigate = useNavigate();
  const { adverts, total } = useSelector(
    (state: RootState) => state.adverts.adverts
  );

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalitems = Number(total)  


  const skip = 6;
  const filter = {};
  const [position, setPosition] = useState<number>(1);

  const filterProducts: FilterAdverts = {
    ...filter,
    page: position,
    limit: skip,
  };

  const { isLoading, isError, error,refetch } = useGetAllAdvertsQuery(filterProducts);
  const {data:brands} = useGetBrandsQuery()
  const {data:universe} = useGetUniversesQuery()

  useEffect(()=>{
    if(adverts.length === 0){
      refetch()
    }
  },[adverts.length])


  if (isError) {
  }

  if (isLoading) {
    return <p>Cargando...</p>;
  }
  if (isError) {
    const err = error as ApiError;
    return (
      <div>
        <p>Hubo un error</p>
        <p>{err.data.message}</p>
      </div>
    );
  }
  if(universe ){
  return (
    <MainLayout>
      <Banner
        backgroundImages={logosBanner}
        text="Estás a una búsqueda de completar tu colección"
        highlights={["búsqueda", "colección"]}

        height="h-80 md:h-96"
        logos={universeLogos}
      />
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

          
          <ImageGrid
            logos={universe }
            columns={8}
            width={170}
            height={80}
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
        <AdvertSlider title="Nuevos lanzamientos" products={adverts} />
        <AdvertSlider title="Recomendados para ti" products={adverts} />
        <AdvertSlider title="Ver todos los artículos" products={adverts} />
      </div>
    </MainLayout>
  );}
}
