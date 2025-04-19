import MainLayout from "../../layouts/MainLayout";
import Banner from "../../components/develop/Banner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectAdverts, selectFilters } from "@/store/selectors/advertsSelectors";
import { useFilterAdvertsQuery } from "@/services/advertsApi";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection"
import { logosBanner, universeLogos, sideBarMenu} from "../../containers/develop/MockData"
//import ProductGrid from "../../../../../collecto-maquetado/src/components/AdvertGrid"



export default function UniversePage() {

  const {adverts,total} = useSelector((state: RootState) => selectAdverts(state));//  obtener los anuncios y el total
  const filter = useSelector((state:RootState)=> selectFilters(state)) //  obtener los valores del filtro 
  const { refetch  } = useFilterAdvertsQuery(filter); // Peticion para obtener adverts filtrados
  
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalitems = Number(total)  

 

  return (
    <MainLayout>
      <Banner
          backgroundImages={logosBanner}
          text="Estás a una búsqueda de completar tu colección"
          highlights={["búsqueda", "colección"]}
          height="h-60"
          logos={universeLogos}
        />
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
    </MainLayout>
  );
}