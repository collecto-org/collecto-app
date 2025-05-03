import BannerPages from "../../components/develop/BannerPages";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import { useNavigate, useParams } from "react-router-dom";
import FilteredAdvertSectionProps from "@/componentsUI/containers/develop/FilteredAdverSection";
import {
  selectBrands,
  selectUniverseOrBrandBySlug,
} from "@/store/selectors/optionsSelectors";
import { clearFilter, setFilter } from "@/store/slices/advertsSlice";
import { useFilterAdvertsQuery } from "@/services/advertsApi";
import ModalLogin from "@/componentsUI/containers/develop/ModalLogin";
import Button from "@/componentsUI/elements/Button";
import { FiArrowLeft } from "react-icons/fi";

export default function UniversePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const brands = useSelector((state: RootState) => selectBrands(state));
  const actualUniverse = useSelector((state: RootState) =>
    selectUniverseOrBrandBySlug(state, slug)
  );
  const filter = useSelector((state: RootState) => selectFilters(state));

  const isBrandPage = actualUniverse?.type === "brand";
  const pageLabel = isBrandPage ? "Marca" : "Universo";

  useEffect(() => {
    if (!actualUniverse || !slug) return;

    if (actualUniverse.universe) {
      if (isBrandPage && actualUniverse.universe._id !== filter.brand) {
        dispatch(setFilter({ brand: actualUniverse.universe._id }));
      }
      if (!isBrandPage && actualUniverse.universe._id !== filter.universe) {
        dispatch(setFilter({ universe: actualUniverse.universe._id }));
      }
    }
  }, [slug, actualUniverse, dispatch, filter, isBrandPage]);

  useEffect(() => {
    if (filter.limit !== 12 || filter.page !== 1) {
      dispatch(setFilter({ limit: 12, page: 1 }));
    }
  }, [dispatch, filter.limit, filter.page]);

  useEffect(() => {
    return () => {
      dispatch(clearFilter());
    };
  }, [dispatch]);

  const { data: adverts, isLoading } = useFilterAdvertsQuery(filter, {
    skip: !filter.universe && !filter.brand,
    refetchOnMountOrArgChange: false,
  });

  const bannerImage = actualUniverse?.universe?.slug
    ? isBrandPage
      ? `/gridImages/${actualUniverse.universe.slug}-brand.jpg`
      : `/gridImages/${actualUniverse.universe.slug}.jpg`
    : isBrandPage
    ? "/gridImages/default-brand-banner.jpg"
    : "/gridImages/collecto-banner-principal.jpg";

  if (isLoading) return <p>Loading...</p>;

  if (brands) {
    return (
      <>
        {isLoginModalOpen && (
          <ModalLogin
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onRecoverPassword={() => {}}
            onRegister={() => {}}
          />
        )}

        <div className="pt-10 md:pt-14">
          <BannerPages
            backgroundImages={[bannerImage]}
            isBrandBanner={isBrandPage}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-10">
          {/* Botón de volver */}
          <Button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2"
            variant="turquoise"
          >
            <FiArrowLeft className="w-5 h-5" />
            Volver
          </Button>

          <FilteredAdvertSectionProps
            headerLabel={pageLabel}
            label={
              actualUniverse
                ? actualUniverse.universe.name
                : `No hay ${pageLabel.toLowerCase()}`
            }
            adverts={adverts ? adverts : { adverts: [], total: "0" }}
          />
        </div>
      </>
    );
  }

  return null;
}
