import MainLayout from "../../layouts/develop/MainLayout";
import Navbar from "../../containers/develop/Navbar";
import Banner from "../../components/develop/Banner";
import FiltersSidebar from "../../containers/develop/FiltersSidebar";
import ProductGrid from "../../containers/develop/ProductGrid";
import PaginationBlock  from "../../containers/develop/PaginationBlock";
import Footer from "../../containers/develop/Footer";
//import ProductGrid from "../../containers/AdvertGrid"
//import ProductGrid from "../../../../../collecto-maquetado/src/components/AdvertGrid"



export default function HomePage() {
 const banners = [
  "/images/dragon1.jpeg",
  "/images/dragon2.jpeg",
  "/images/simpsons1.jpeg",
  "/images/simpsons2.jpeg",
  "/images/startswars1.jpg",
  "/images/startswars2.jpeg",
  "/images/startswars3.jpg"
 ]

 const logosBanner = [
      "/logos/bandai.png",
      "/logos/hasbro.png",
      "/logos/mattel.png",
      "/logos/neca.png",
      "/logos/other.png",
      "/logos/collecto.png",
      "/logos/bandai.png"
 ]
  return (
    <MainLayout>
      <Navbar />
      <Banner
          backgroundImages={banners}
          text="Estás a una búsqueda de completar tu colección"
          highlights={["búsqueda", "colección"]}
          height="h-80"
          logos={logosBanner}
        />

      <h1 className="text-3xl font-bold text-left px-8 py-4">TITLE OF THE UNIVERSE</h1>

      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar pegado al margen izquierdo */}
        <div className="col-span-12 md:col-span-3 px-4">
          <FiltersSidebar />
        </div>

        {/* Contenido principal */}
        <div className="col-span-12 md:col-span-9 px-4 space-y-4">
          <PaginationBlock  />
          <ProductGrid />
        </div>
      </div>

      <Footer />
    </MainLayout>
  );
}