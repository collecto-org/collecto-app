import { useSelector } from "react-redux";
import { useGetMyFavAdvertsQuery } from "@/services/usersApi";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { selectFilters } from "@/store/selectors/advertsSelectors";

import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdvertSectionUser";
import NoResults from "@/componentsUI/elements/noResults";

export default function AdvertsFavorites() {
  const filters = useSelector(selectFilters);

  const filterProducts: FilterAdverts = {
    ...filters,
  };

  const {
    data: adverts,
    isLoading,
    isError,
  } = useGetMyFavAdvertsQuery(filterProducts);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Ocurrio un error</p>;
  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {/* Encabezado */}
          <div className="text-left">
            <h1 className="text-2xl font-bold text-darkblue">Tus favoritos</h1>
            <p className="text-sm text-gray-600">
              Aquí están los anuncios que has marcado como favoritos.
            </p>
          </div>

          {/* Contenido */}
          {adverts ? (
            <FilteredAdvertSectionProps adverts={adverts.adverts} />
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </>
  );
}
