import MainLayout from "../../layouts/develop/MainLayout";
import Banner from "../../components/develop/Banner";
import ImageGrid from "../../components/develop/ImageGrid";
import AdvertSlider from "../../containers/develop/AdvertSlider";
import { useNavigate } from "react-router-dom";
//import AdvertSlider from "../../containers/develop/AdvertSlidercopy";


const banners = [
  "/images/dragon1.jpeg",
  "/images/dragon2.jpeg",
  "/images/simpsons1.jpeg",
  "/images/simpsons2.jpeg",
  "/images/startswars1.jpg",
  "/images/startswars2.jpeg",
  "/images/startswars3.jpg"
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
        <AdvertSlider title="Nuevos lanzamientos" products={mockProducts} />
        <AdvertSlider title="Recomendados para ti" products={mockProducts} />
        <AdvertSlider title="Ver todos los artículos" products={mockProducts} />
      </div>
    </MainLayout>
  );
}
