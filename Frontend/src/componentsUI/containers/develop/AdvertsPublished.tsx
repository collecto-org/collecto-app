import { useDispatch, useSelector } from "react-redux";
import { useGetMyadvertsQuery } from "@/services/usersApi";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { selectFilters } from "@/store/selectors/advertsSelectors";

import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdvertSectionUser";
import NoResults from "@/componentsUI/elements/NoResults";
import { useEffect } from "react";
import { clearFilter } from "@/store/slices/advertsSlice";

export default function UserAdvertsPublished() {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch()

  const filterProducts: FilterAdverts = {
    ...filters,
  };

  const {
    data: adverts,
    isLoading,
    isError,
  } = useGetMyadvertsQuery(filterProducts);

  useEffect(() => {
    return () => {
      dispatch(clearFilter());
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <NoResults /> //temporal hasta que la api devuelva un 200
  return (
    <>
      <div>
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {/* Encabezado */}
          <div className="text-left">
            <h1 className="text-2xl font-bold text-darkblue">
              Tus Artículos Publicados
            </h1>
            <p className="text-sm text-gray-600">
              Aquí encontrarás tus anuncios publicados.
            </p>
          </div>

          {/* Contenido */}
          {adverts ? (
            <FilteredAdvertSectionProps total={Number(adverts.total)} adverts={adverts.adverts} />
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </>
  );
}
