import BannerPages from "../../components/develop/BannerPages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  selectFilters,
} from "@/store/selectors/advertsSelectors";

import { useParams } from "react-router-dom";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import {
  selectBrands,
  selectUniverseOrBrandBySlug,
} from "@/store/selectors/optionsSelectors";
import { setFilter } from "@/store/slices/advertsSlice";
import { useFilterAdvertsQuery } from "@/services/advertsApi";

export default function UniversePage() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const brands = useSelector((state: RootState) => selectBrands(state));
  const actualUniverse = useSelector((state: RootState) =>
    selectUniverseOrBrandBySlug(state, slug)
  );

  const filter = useSelector((state: RootState) => selectFilters(state));
  useEffect(() => {
    if (!actualUniverse || !slug) return;

    if (actualUniverse.universe) {
      if (
        actualUniverse.type === "brand" &&
        actualUniverse.universe._id !== filter.brand
      ) {
        dispatch(setFilter({ brand: actualUniverse.universe._id }));
      }
      if (
        actualUniverse.type === "universe" &&
        actualUniverse.universe._id !== filter.universe
      ) {
        dispatch(setFilter({ universe: actualUniverse.universe._id }));
      }
    }
  }, [slug, actualUniverse, dispatch, filter]);

useEffect(()=>{
  dispatch(setFilter({limit:12,page:1}))
},[])

  const { data: adverts,  isLoading } = useFilterAdvertsQuery(filter,{skip:!filter.limit
  });

  if (isLoading) return <p>Loading...</p>;


  if (brands) {
    return (
      <>
        <div className="pt-10 md:pt-14">
          <BannerPages
            backgroundImages={[
              actualUniverse?.universe?.slug
                ? `/gridImages/${actualUniverse.universe.slug}.jpg`
                : "/gridImages/collecto-banner-principal.jpg",
            ]}
          />
        </div>

        {/* <Banner
          backgroundImages={logosBanner}
          text="Estás a una búsqueda de completar tu colección"
          highlights={["búsqueda", "colección"]}
          height="h-64"
          logos={brands}
        /> */}

        <FilteredAdvertSectionProps 
          headerLabel="Universo"
          label={
            actualUniverse ? actualUniverse.universe.name : "No hay uniuverso"
          }
          adverts={adverts ? adverts : {adverts:[],total:"0"}}

        />
      </>
    );
  }
}