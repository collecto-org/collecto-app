// src/components/ProductGrid.tsx

import NoResults from "@/componentsUI/elements/noResults";
import ProductCard from "../../components/develop/AdvertCard";

import { Advert } from "@/services/schemas/AdvertsSchemas";

type Props = {
  adverts: Advert[];
};

export default function ProductGrid({ adverts }: Props) {

  if(adverts.length ===0){
    return <NoResults/>
  }else{
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-7">
        {adverts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );}
}
