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
  "/gridImages/dc.jpg",
  "/gridImages/dragon-ball.jpg",
  "/gridImages/harry-potter.jpg",
  "/gridImages/marvel.jpg",
  "/gridImages/nintendo.jpg",
  "/gridImages/pokemon.jpeg",
  "/gridImages/star-wars.jpg",
  "/gridImages/disney.jpg",
  "/gridImages/the-lord-of-the-ring.jpg",
  "/gridImages/transformers.jpg",
];

const logosBanner = [
  "/logos/universos/disney.png",
  "/logos/universos/marvel.png",
  "/logos/universos/harry-potter.png",
  "/logos/universos/pokemon.png",
  "/logos/universos/nintendo.png",
  "/logos/universos/star-wars.png",
  "/logos/universos/the-lord-of-the-rings.png",
  "/logos/universos/dragon-ball.png",
  "/logos/universos/dc.png",
  "/logos/universos/the-transformers.png",
];

const universeLogos = [
  "/logos/marcas/banday-spirits.png",
  "/logos/marcas/sideshow.png",
  "/logos/marcas/lego.png",
  "/logos/marcas/mcfarlane-toys.png",
  "/logos/marcas/funko.png",
  "/logos/marcas/threezero.png",
  "/logos/marcas/hot-toys.png",
  "/logos/marcas/iron-studios.png",
  "/logos/marcas/hasbro.png",
  "/logos/marcas/diamond-select-toys.png",
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
  const { adverts, total } = useSelector(
    (state: RootState) => state.adverts.adverts
  );
  const skip = 6;
  const filter = {};
  const [position, setPosition] = useState<number>(1);

  const filterProducts: FilterAdverts = {
    ...filter,
    page: position,
    limit: skip,
  };

  const { isLoading, isError, error } = useGetAllAdvertsQuery(filterProducts);

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
  return (
    <MainLayout>
      <Banner
        backgroundImages={banners}
        text="Estás a una búsqueda de completar tu colección"
        highlights={["búsqueda", "colección"]}
        height="h-80"
        logos={universeLogos}
      />
      <section className="my-4">
        <ImageGrid
          logos={logosBanner}
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

      <div className="space-y-10 px-4 mt-8">
        <AdvertSlider title="Nuevos lanzamientos" products={adverts} />
        <AdvertSlider title="Recomendados para ti" products={adverts} />
        <AdvertSlider title="Ver todos los artículos" products={adverts} />
      </div>
    </MainLayout>
  );
}
