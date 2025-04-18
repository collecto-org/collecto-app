import MainLayout from "../../layouts/develop/MainLayout";
import Banner from "../../components/develop/Banner";
import ImageGrid from "../../components/develop/ImageGrid";
import AdvertSlider from "../../containers/develop/AdvertSlider";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetAllAdvertsQuery } from "@/services/advertsApi";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { useState } from "react";
import { ApiError } from "@/services/schemas";
//import AdvertSlider from "../../containers/develop/AdvertSlidercopy";


const banners = [
  "/gridImages/dragon1.jpeg",
  "/gridImages/dragon2.jpeg",
  "/gridImages/simpsons1.jpeg",
  "/gridImages/simpsons2.jpeg",
  "/gridImages/startswars1.jpg",
  "/gridImages/startswars2.jpeg",
  "/gridImages/startswars3.jpg"
];

const logosBanner = [
  "/logos/universos/DCComics.svg",
  "/logos/universos/Disney.svg",
  "/logos/universos/DragonBallZ.svg",
  "/logos/universos/HarryPotter.svg",
  "/logos/universos/Marvel.svg",
  "/logos/universos/Nintendo.svg",
  "/logos/universos/Pokemon.svg",
  "/logos/universos/StarWars.svg",
  "/logos/universos/TheSimpsons.svg",
  "/logos/universos/Tloftr.svg"
];

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

const mockProducts = Array.from({ length: 20 }, (_, i) => {
    const base = [
      {
        imageUrl: "/adverts/ventress.png",
        brand: "Hot Toys",
        name: "Asajj Ventress",
        price: "1.099,99€",
      },
      {
        imageUrl: "/adverts/rebel-trooper-stormtrooper.png",
        brand: "Hasbro",
        name: "Rebel Trooper & Stormtrooper",
        price: "49,99€",
      },
      {
        imageUrl: "/adverts/obi-wan-kenobi.png",
        brand: "Hot Toys",
        name: "Obi-Wan Kenobi",
        price: "388,00€",
      },
      {
        imageUrl: "/adverts/boba-fett.png",
        brand: "Hot Toys",
        name: "Boba Fett Repaint Armor",
        price: "216,99€",
      },
    ];
    return base[i % base.length]; 
  });

export default function HomePage() {
  const navigate = useNavigate();
  const {adverts,total} = useSelector((state: RootState) => state.adverts.adverts);
  const skip = 6;
  const filter = {}
  const [position, setPosition] = useState<number>(1);

  const filterProducts: FilterAdverts = {
    ...filter,
    page: position,
    limit: skip,
  };

  const { isLoading, isError,error } = useGetAllAdvertsQuery(filterProducts);

  if (isError){
  }
  
  if(isLoading){
    return (
      <p>Cargando...</p>
    )
  }
  if(isError){
  const err= error as ApiError
  return (
    <div>
    <p>Hubo un error</p>
    <p>{err.data.message}</p>
    </div>
  )
}
  return (
    <MainLayout>
      <Banner
        backgroundImages={banners}
        text="Estás a una búsqueda de completar tu colección"
        highlights={["búsqueda", "colección"]}
        height="h-60"
        logos={universeLogos}
      />
    <section className="my-4">
    <ImageGrid
        logos={logosBanner}
        columns={8}
        width={170}
        height={80}
        onClickLogo={(src) => {
            const slug = src.split("/").pop()?.replace(".svg", "").toLowerCase(); 
            navigate(`/universe/${slug}`);
        }}
        />
    </section>
    



      <div className="space-y-10 px-4 mt-8">
        <AdvertSlider title="Nuevos lanzamientos" products={adverts} />
        <AdvertSlider title="Recomendados para ti" products={adverts} />
        <AdvertSlider title="Ver todos los artículos" products={adverts} />
      </div>
    </MainLayout>
  );
}
