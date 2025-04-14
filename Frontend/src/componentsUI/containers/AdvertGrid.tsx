// src/components/ProductGrid.tsx
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import ProductCard from "../components/AdvertCard";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetAllAdvertsQuery } from '../../services/advertsApi';
import { setAdverts } from '../../store/slices/advertsSlice';

export default function ProductGrid(filter?:FilterAdverts) {
  const dispatch = useDispatch()
      const adverts = useSelector((state:RootState) => state.adverts.adverts)
    const skip = 6;
    const [position, setPosition] = useState<number>(1);
    
    const filterProducts:FilterAdverts = {...filter,page:position,limit:skip}
      const { data: newAdverts } = useGetAllAdvertsQuery(filterProducts );
      useEffect(() => {
          const fetchAdverts = async () => {
            try {
              if(newAdverts ){
                  dispatch(setAdverts(newAdverts))
              }
            } catch (error) {
              console.error("Error in getAdverts:", error);
            }
          };
        
          fetchAdverts();
        }, [dispatch,newAdverts,adverts]);    
      
    const limit = Math.ceil(4 / skip);
  
    const handlePaginate = (isNext: boolean) => {
      // lógica de la paginación
      let newPosition = isNext ? position + 1 : position - 1;
      newPosition = Math.max(1, Math.min(newPosition, limit));
      setPosition(newPosition);
    };
  
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 px-4 mx-2 sm:px-6 py-4">
        {adverts.map((product, index) => (
          <Link key={index} to={`/adverts/${product.slug}`}>
          <ProductCard key={index} {...product} />
          </Link>
         
        ))}
        <div className="flex justify-center items-center gap-4 mt-1.5 ">
				<button
					onClick={() => handlePaginate(false)}
					className="bg-blue-600 text-white px-6 py-3  shadow-md hover:bg-blue-700 transition-all disabled:bg-gray-400 "
					disabled={position <= 1}
				>
					Atrás
				</button>

				<button
					onClick={() => handlePaginate(true)}
					className="bg-green-500 text-white px-6 py-3  shadow-md hover:bg-green-600 transition-all disabled:bg-gray-400 "
					disabled={position >= limit}
				>
					Siguiente
				</button>
			</div>
      
      </div>
    </div>
  );
}
