import React from "react";
import ProductCard from "@/componentsUI/components/develop/AdvertCard";

interface Product {
  imageUrl: string;
  brand: string;
  name: string;
  price: string;
}

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export default function AdvertSlider({ title, products }: ProductCarouselProps) {
  return (
    <section className="px-4 md:px-8 py-6">
      <h2 className="text-xl md:text-2xl font-semibold text-darkblue mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {products.map((product, index) => (
          <div key={index} className="flex-shrink-0">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
}

