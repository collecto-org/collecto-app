import NoResults from "@/componentsUI/elements/NoResults";
import ProductCard from "../../components/develop/AdvertCard";

import { Advert } from "@/services/schemas/AdvertsSchemas";

type Props = {
  adverts: Advert[];
  forceFavorite?: boolean;
  openLoginModal: () => void;
};

export default function ProductGrid({ adverts, forceFavorite = false,openLoginModal }: Props) {
  if (adverts.length === 0) {
    return <NoResults />;
  } else {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div
          className="
            grid
            gap-2 sm:gap-3 md:gap-4
            grid-cols-2
            sm:grid-cols-3
            xl:grid-cols-4
          "
        >
          {adverts.map((product, index) => (
            <ProductCard
              key={index}
              {...product}
              isFavorite={forceFavorite ? true : product.isFavorite}
              openLoginModal={openLoginModal}
            />
          ))}
        </div>
      </div>
    );
  }
}
