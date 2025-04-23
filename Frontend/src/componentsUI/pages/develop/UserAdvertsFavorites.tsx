import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import MainLayout from "@/componentsUI/layouts/MainLayout";
import { useGetMyFavAdvertsQuery } from "@/services/usersApi";
import { FilterAdverts } from "@/services/schemas/AdvertsSchemas";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";
import {
  selectFilterAdverts,
  selectFilters,
} from "@/store/selectors/advertsSelectors";

import { setFilter } from "@/store/slices/advertsSlice";

import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";

export default function UserAdvertsFavorites() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filters = useSelector(selectFilters);
  const { adverts, total } = useSelector(
    (state: RootState) => state.adverts.adverts
  );

  const skip = filters.limit || 6;
  const page = filters.page || 1;

  const filterProducts: FilterAdverts = {
    ...filters,
    page,
    limit: skip,
  };

  useEffect(() => {
    if (!user || !user.isLogged) {
      navigate("/login");
    }
  }, [user, navigate]);

  const { isLoading, isError } = useGetMyFavAdvertsQuery(filterProducts);

  const totalPages = Math.ceil(Number(total || 0) / skip);

  return (
    <MainLayout>
      <div className="pt-24 md:pt-32">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          {/* Encabezado */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-darkblue">Tus favoritos</h1>
            <p className="text-sm text-gray-600">
              Aquí están los anuncios que has marcado como favoritos.
            </p>
          </div>

          {/* Contenido */}
          <FilteredAdvertSectionProps
            headerLabel="Favoritos"
            label="Tus anuncios favoritos"
            adverts={adverts}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
    </MainLayout>
  );
}
