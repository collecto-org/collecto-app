import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import ProductCard from "../componentsUI/components/AdvertCard";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetMyadvertsQuery } from "@/services/usersApi";
import { RootState } from "@/store/store";


interface ProductGridProps {
  filter?: FilterAdverts;
}

export default function MyAdvertsGrid({ filter = {} }: ProductGridProps) {
  const {adverts,total} = useSelector((state: RootState) => state.adverts.adverts);
  const skip = 6;
  const [position, setPosition] = useState<number>(1);

  const filterProducts: FilterAdverts = {
    ...filter,
    page: position,
    limit: skip,
  };

  const { isLoading, isError } = useGetMyadvertsQuery(filterProducts);
  console.log(isError,"EOOO")
  
  const totalPages = (Math.ceil(Number(total|| 0 )) / skip);


  const handlePaginate = (isNext: boolean) => {
    setPosition((prev) => {
      const newPos = isNext ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(newPos, totalPages));
    });
  };



  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {isLoading && <p>Cargando productos...</p>}
      {isError && <p>Error al cargar productos.</p>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-4 mx-2 sm:px-6 py-4">
        {adverts.map((product) => (
          <Link key={product.slug} to={`/adverts/${product.slug}`}>
            <ProductCard {...product} />
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={() => handlePaginate(false)}
          className="bg-blue-600 text-white px-6 py-3 shadow-md hover:bg-blue-700 transition-all disabled:bg-gray-400"
          disabled={position <= 1}
        >
          Atrás
        </button>
        <button
          onClick={() => handlePaginate(true)}
          className="bg-green-500 text-white px-6 py-3 shadow-md hover:bg-green-600 transition-all disabled:bg-gray-400"
          disabled={position >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
