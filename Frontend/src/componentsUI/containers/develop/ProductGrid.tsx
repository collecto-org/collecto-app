import ProductCard from "../../components/AdvertCard";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockAdverts } from './MockData'; // <-- importa aquí

const skip = 6;

export default function ProductGrid() {
  const [position, setPosition] = useState<number>(1);

  const paginatedAdverts = mockAdverts.slice((position - 1) * skip, position * skip);
  const totalPages = Math.ceil(mockAdverts.length / skip);

  const handlePaginate = (isNext: boolean) => {
    setPosition((prev) => {
      const newPos = isNext ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(newPos, totalPages));
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-4 mx-2 sm:px-6 py-4">
        {paginatedAdverts.map((product) => (
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
