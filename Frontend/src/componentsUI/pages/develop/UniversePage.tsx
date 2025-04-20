import MainLayout from "../../layouts/MainLayout";
import Banner from "../../components/develop/Banner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  selectFilterAdverts,
  selectFilters,
} from "@/store/selectors/advertsSelectors";

import { useParams } from "react-router-dom";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import {
  logosBanner,
} from "../../containers/develop/MockData";
import {
  selectBrands,
  selectUniverseOrBrandBySlug,
} from "@/store/selectors/optionsSelectors";
import { setFilter } from "@/store/slices/advertsSlice";
import { useFilterAdvertsQuery } from "@/services/advertsApi";

export default function UniversePage() {
  const dispatch = useDispatch();
  const { adverts } = useSelector((state: RootState) => selectFilterAdverts(state));
  const { slug } = useParams();

  const brands = useSelector((state: RootState) => selectBrands(state));
  const actualUniverse = useSelector((state: RootState) => selectUniverseOrBrandBySlug(state, slug));

  const filter = useSelector((state: RootState) => selectFilters(state));

  useEffect(() => {
    if (!actualUniverse || !slug) return;

    if (actualUniverse.universe) {
      if (actualUniverse.type === "brand" && actualUniverse.universe._id !== filter.brand) {
        dispatch(setFilter({ brand: actualUniverse.universe._id }));
      }
      if (actualUniverse.type === "universe" && actualUniverse.universe._id !== filter.universe) {
        dispatch(setFilter({ universe: actualUniverse.universe._id }));

      }
    }
  }, [slug, actualUniverse, dispatch, filter]); 

  const { error, isLoading } = useFilterAdvertsQuery(filter);


if(isLoading) return <p>Loading...</p>


  if (brands && actualUniverse && actualUniverse.universe) {
    return (
      <MainLayout>
        <Banner
          backgroundImages={logosBanner}
          text="Estás a una búsqueda de completar tu colección"
          highlights={["búsqueda", "colección"]}
          height="h-60"
          logos={brands}
        />

        <FilteredAdvertSectionProps
          headerLabel="Universo"
          label={actualUniverse.universe?.name}
          adverts={adverts}
        />
      </MainLayout>
    );
  }
}
