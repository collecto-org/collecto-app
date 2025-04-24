import { useSelector } from "react-redux";
import { useGetMyadvertsQuery } from "@/services/usersApi";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { selectFilters } from "@/store/selectors/advertsSelectors";

import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import NoResults from "@/componentsUI/elements/noResults";

export default function UserAdvertsPublished() {
  const filters = useSelector(selectFilters);

  const filterProducts: FilterAdverts = {
    ...filters,
  };

  const {
    data: adverts,
    isLoading,
    isError,
  } = useGetMyadvertsQuery(filterProducts);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Ocurrio un error</p>;
  return (
    <>
      <div className="pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {/* Encabezado */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-darkblue">
              Tus Artículos Publicados
            </h1>
            <p className="text-sm text-gray-600">
              Aquí encontrarás tus anuncios publicados.
            </p>
          </div>

          {/* Contenido */}
          {adverts ? (
            <FilteredAdvertSectionProps
              headerLabel="Mis productos"
              label="Tus anuncios publicados"
              adverts={adverts.adverts}
            />
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </>
  );
}
