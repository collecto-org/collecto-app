import React, { useRef } from "react";
import ProductCard from "@/componentsUI/components/develop/AdvertCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Advert } from "@/services/schemas/AdvertsSchemas";

interface Product {
  imageUrl: string;
  brand: string;
  name: string;
  price: string;
}

interface ProductCarouselProps {
  title: string;
  products: Advert[];
}

export default function AdvertSlider({ title, products }: ProductCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="px-4 md:px-8 py-6">
      <h2 className="text-xl md:text-2xl font-semibold text-darkblue mb-4">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        >
          <ChevronLeft className="w-5 h-5 text-darkblue" />
        </button>
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto pb-2 px-6 no-scrollbar"
        >
          {products.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-[180px]">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        >
          <ChevronRight className="w-5 h-5 text-darkblue" />
        </button>
      </div>
    </section>
  );
}
