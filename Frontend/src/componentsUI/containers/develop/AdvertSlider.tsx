import React, { useEffect, useRef, useState } from "react";
import ProductCard from "@/componentsUI/components/develop/AdvertCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Advert } from "@/services/schemas/AdvertsSchemas";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/slices/advertsSlice";
import { selectFilters } from "@/store/selectors/advertsSelectors";



interface ProductCarouselProps {
  title: string;
  adverts:{ adverts:Advert[],
              total:string
}}

export default function AdvertSlider({
  title,
  adverts,
}: ProductCarouselProps) {


  const sliderRef = useRef<HTMLDivElement>(null);
 const dispatch = useDispatch()
   const filters = useSelector(selectFilters);
 
 const total = Number(adverts.total)

 const limit = 10;
 const page =  filters.page ?? 1;

   const [currentPage, setCurrentPage] = useState(page);
 
  
 useEffect(() => {
    setCurrentPage(page);
  }, [page]);
  

  const [displayedAdverts, setDisplayedAdverts] = useState<Advert[]>([]);
  
  const [position,setPosition] = useState(limit)

  useEffect(() => {
    if (adverts.adverts.length > 0) {
      setDisplayedAdverts((prev) => {
        const newAdverts = adverts.adverts.filter(
          (adv) => !prev.some((p) => p._id === adv._id)
        );
        return [...prev, ...newAdverts];
      });
    }
  }, [adverts.adverts]);

  const handlePageChange = (direction: "prev" | "next") => {
    const newPage = direction === "prev"
      ? Math.max(currentPage - 1, 1)
      : currentPage + 1;
  
    const totalLoaded = displayedAdverts.length;
    if (direction === "next" && totalLoaded >= total) return; 
    setPosition(position+1)

    if(position === totalLoaded){
  
    setCurrentPage(newPage);
    dispatch(setFilter({ page: newPage, limit }));}
  };




  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      if (direction === "right" ) {
        handlePageChange("next")
      } else if (direction === "left" ) {
        handlePageChange("prev")
      }
    }
  }
 

  return (
    <section className="px-4 md:px-8 py-2">
      <h2 className="text-xl md:text-2xl font-semibold text-darkblue mb-4">
        {title}
      </h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        >
          <ChevronLeft className="w-5 h-5 text-darkblue" />
        </button>
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto pb-2 px-6 scrollbar-hide"
        >
          {displayedAdverts.map((product, index) => (
  <div key={product._id || index} className="flex-shrink-0">
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
