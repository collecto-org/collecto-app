
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  AdverContent from "./advert"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useGetAllAdvertsQuery } from '../services/advertsApi';
import { setAdverts } from '../store/slices/advertsSlice';


function Adverts() {


    const dispatch = useDispatch()
    const adverts = useSelector((state:RootState) => state.adverts.adverts)
    const { data: newAdverts } = useGetAllAdvertsQuery(undefined, {
        skip: adverts.length > 0, 
    });
    useEffect(() => {
        const fetchAdverts = async () => {
          try {
            if(newAdverts && adverts.length === 0){
                dispatch(setAdverts(newAdverts))
            console.log(adverts)            
            }
          } catch (error) {
            console.error("Error in getAdverts:", error);
          }
        };
      
        fetchAdverts();
      }, [dispatch, useGetAllAdvertsQuery]); // ← importante el array vacío o dependencias
      


	const adds = adverts

	const skip = 6;

	const [position, setPosition] = useState<number>(1);

	const [paginatedFilter, setPaginate] = useState<number[]>([0, skip]);

	const limit = Math.ceil(adds.length / skip);

	const handlePaginate = (isNext: boolean) => {
		// lógica de la paginación
		let newPosition = isNext ? position + 1 : position - 1;
		newPosition = Math.max(1, Math.min(newPosition, limit));
		setPosition(newPosition);
		setPaginate([skip * (newPosition - 1), skip * newPosition]);
	};

	useEffect(() => {
		if (adds.length) {
			if (position > limit) {
				setPosition(1);
				setPaginate([0, skip]);
			}
		}
	}, [adds, position, limit]);

	const paginatedAdds =
		adds.slice(paginatedFilter[0], paginatedFilter[1]) ?? []; // crear un nuevo array con los anuncios que se van a mostrar en la página

	return (
		<div className="container ml-4 mb-10">
			{paginatedAdds.length ? (
				<article className="flex justify-center items-center">
					<ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
						{paginatedAdds.map((advert) => (
							<li key={advert.slug} className="mt-3.5">
								<Link to={`/adverts/${advert.slug}`}>
									<AdverContent advert={advert} />
								</Link>
							</li>
						))}
					</ul>
				</article>
			) :  (
				"<EmptyFilterList />"
			) }: 
				

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
	);
}

export default Adverts;
