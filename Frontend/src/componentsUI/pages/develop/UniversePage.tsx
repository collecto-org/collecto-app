import MainLayout from "../../layouts/develop/MainLayout";
import Banner from "../../components/develop/Banner";
import SideBarMenu from "../../containers/develop/SidebarMenu";
//import ProductGrid from "../../containers/develop/ProductGrid";
import PaginationBlock  from "../../containers/develop/PaginationBlock";
import Title from "@/componentsUI/components/develop/Title";
import { useState } from "react";
import ProductGrid from "../../containers/develop/AdvertGrid"
//import ProductGrid from "../../../../../collecto-maquetado/src/components/AdvertGrid"



export default function HomePage() {

 const [currentPage, setCurrentPage] = useState(1)
 const [pageSize, setPageSize] = useState(10)
 const [searchTerm, setSearchTerm] = useState("")

 const totalitems = 45
 const totalPages = Math.ceil(totalitems/pageSize) 

 const banners = [
  "/images/dragon1.jpeg",
  "/images/dragon2.jpeg",
  "/images/simpsons1.jpeg",
  "/images/simpsons2.jpeg",
  "/images/startswars1.jpg",
  "/images/startswars2.jpeg",
  "/images/startswars3.jpg"
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
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
          />
        </div>
        
        <div className="col-span-12 md:col-span-3 border border-black">
          <SideBarMenu 
          title="Tipo de producto"
          options={sideBarMenu}
          />
        </div>

        <div className="col-span-12 md:col-span-9 border border-black">
          <ProductGrid />
        </div>
      </div>
    </MainLayout>
  );
}