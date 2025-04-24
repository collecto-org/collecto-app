import { useGetUserAdvertsQuery } from "@/services/usersApi";

import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import NoResults from "@/componentsUI/elements/noResults";
import { useParams } from "react-router-dom";

export default function UserAdverts() {

  const {username} = useParams()


  const {data:adverts, isLoading, isError } = useGetUserAdvertsQuery(username? username: "", {skip:!username});

  if(isLoading) return <p>Loading...</p>
  if(isError) return <p>Ocurrio un error</p>
  return (
    <>
      <div className="pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {/* Encabezado */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-darkblue">{username}</h1>
            <p className="text-sm text-gray-600">
              Aquí están los anuncios del usuario {username}.
            </p>
          </div>

          {/* Contenido */}
          {adverts ?
          <FilteredAdvertSectionProps
            headerLabel={username || "usuario no encontrado"}
            label={`Anuncios de ${ username || "usuario no encontrado"}`}
            adverts={adverts.adverts}
          /> : <NoResults/>}
        </div>
      </div>
    </>
  );
}
