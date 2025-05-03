import { useGetUserAdvertsQuery } from "@/services/advertsApi";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import NoResults from "@/componentsUI/elements/NoResults";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearFilter } from "@/store/slices/advertsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import Button from "@/componentsUI/elements/Button";
import { FiArrowLeft } from "react-icons/fi";

export default function UserAdverts() {
  const { username } = useParams();
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filterProducts: FilterAdverts = {
    ...filters,
  };
  console.log(filterProducts);
  useEffect(() => {
    return () => {
      dispatch(clearFilter());
    };
  }, []);

  const {
    data: adverts,
    isLoading,
    isError,
  } = useGetUserAdvertsQuery(
    { username: username ? username : "", filters: filterProducts },
    { skip: !username }
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Ocurrio un error</p>;
  return (
    <>
      <div className="pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {/* Encabezado */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-coral">{username}</h1>
            <p className="text-sm text-gray-600">
              Aquí están los anuncios del usuario {username}.
            </p>
          </div>

          <Button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 mt-10"
            variant="turquoise"
          >
            <FiArrowLeft className="w-5 h-5" />
            Volver
          </Button>

          {/* Contenido */}
          {adverts ? (
            <FilteredAdvertSectionProps
              headerLabel={username || "usuario no encontrado"}
              label={`Anuncios de ${username || "usuario no encontrado"}`}
              adverts={adverts}
            />
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </>
  );
}
