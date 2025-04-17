import MainLayout from "../../layouts/develop/MainLayout";
import Navbar from "../../containers/develop/Navbar";
import Banner from "../../components/develop/Banner";
import FiltersSidebar from "../../containers/develop/FiltersSidebar";
import ProductGrid from "../../containers/develop/ProductGrid";
import PaginationBlock  from "../../containers/develop/PaginationBlock";
import Footer from "../../containers/develop/Footer";
//import ProductGrid from "../../containers/AdvertGrid"



export default function HomePage() {
  return (
    <MainLayout>
      <Navbar />
      <Banner />

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