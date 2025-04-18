import MainLayout from "../../layouts/develop/MainLayout";
import Banner from "../../components/develop/Banner";
import SideBarMenu from "../../containers/develop/SidebarMenu";
//import ProductGrid from "../../containers/develop/ProductGrid";
import PaginationBlock  from "../../containers/develop/PaginationBlock";
import Title from "@/componentsUI/components/develop/Title";
import { useEffect, useState } from "react";
import ProductGrid from "../../containers/develop/AdvertGrid"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectAdverts, selectFilters } from "@/store/selectors/advertsSelectors";
import { useFilterAdvertsQuery } from "@/services/advertsApi";
//import ProductGrid from "../../../../../collecto-maquetado/src/components/AdvertGrid"



export default function HomePage() {

  const {adverts,total} = useSelector((state: RootState) => selectAdverts(state));//  obtener los anuncios y el total
  
  const filter = useSelector((state:RootState)=> selectFilters(state)) //  obtener los valores del filtro 

  
  const { refetch  } = useFilterAdvertsQuery(filter); // Peticion para obtener adverts filtrados

  useEffect(() => {
    if (filter) {
      refetch(); // Llamamos a refetch cada vez que el filtro cambie
    }
  }, [filter, refetch])

 const [currentPage, setCurrentPage] = useState(1)

 const [pageSize, setPageSize] = useState(10)

 const totalitems = Number(total)
 const totalPages = Math.ceil(totalitems/pageSize) 

 const banners = [
  "/gridImages/dragon1.jpeg",
  "/gridImages/dragon2.jpeg",
  "/gridImages/simpsons1.jpeg",
  "/gridImages/simpsons2.jpeg",
  "/gridImages/startswars1.jpg",
  "/gridImages/startswars2.jpeg",
  "/gridImages/startswars3.jpg"
 ]

 const universeLogos = [
  "/logos/marcas/Bandai.svg",
  "/logos/marcas/GoodSmile.svg",
  "/logos/marcas/Hasbro.svg",
  "/logos/marcas/Iron.jpeg",
  "/logos/marcas/Mattel.svg",
  "/logos/marcas/mezco.png",
  "/logos/marcas/Neca.png",
  "/logos/marcas/Super7.svg"
];

 const sideBarMenu = [
      "Estatuas y réplicas",
      "Figuras de acción",
      "Funko Pop!",
      "Ropa y accesorios",
      "Láminas y póster",
      "Tarjetas, juegos y juguetes",
      "Libros y cómics",
      "Hogar y oficina"
 ]

  return (
    <MainLayout>
      <Banner
          backgroundImages={banners}
          text="Estás a una búsqueda de completar tu colección"
          highlights={["búsqueda", "colección"]}
          height="h-60"
          logos={universeLogos}
        />

      
      <div className="grid grid-cols-12 gap-1 px-1 py-1">
        <div className="col-span-12 md:col-span-3 flex  items-center  justify-center">
            <Title 
            headerLabel="Universo" 
            label="STAR WARS" 
             />

        </div>
        
        <div className="col-span-12 md:col-span-9  flex items-end  justify-center ">
          <PaginationBlock
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) =>{
              setPageSize(size);
              setCurrentPage(1);
            }}
  
          />
        </div>
        
        <div className="col-span-12 md:col-span-3 border border-black">
          <SideBarMenu 
          title="Tipo de producto"
          options={sideBarMenu}
          />
        </div>

        <div className="col-span-12 md:col-span-9 border border-black">
          <ProductGrid adverts={adverts} />
        </div>
      </div>
    </MainLayout>
  );
}