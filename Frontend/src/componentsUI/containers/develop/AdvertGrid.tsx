// src/components/ProductGrid.tsx

import ProductCard from "../../components/develop/AdvertCard";

import { Advert } from "@/services/schemas/AdvertsSchemas";

type Props = {
  adverts: Advert[];
};

export default function ProductGrid({ adverts }: Props) {
 
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-4 mx-2 sm:px-6 py-4">
        {adverts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
}
