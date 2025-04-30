import PaginationBlock from "./PaginationBlock";
import ProductGrid from "./AdvertGrid";
import { useSelector } from "react-redux";
import { selectProductTypes } from "@/store/selectors/optionsSelectors";
import { RootState } from "@/store/store";
import { Advert } from "@/services/schemas/AdvertsSchemas";

interface FilteredAdvertSectionProps {
  adverts: Advert[];
  total?: number;
  forceFavorite?: boolean; // <- añade esto
}

export default function FilteredAdvertSectionUser({
  adverts,
  total,
  forceFavorite = false, // <- valor por defecto
}: FilteredAdvertSectionProps) {
  const productTypes = useSelector((state: RootState) =>
    selectProductTypes(state)
  );

  if (!productTypes) return null;

  return (
    <div className="w-full">
      <div className="w-full space-y-4">
        <div className="flex justify-star">
          <PaginationBlock total={total} />
        </div>

        <ProductGrid adverts={adverts} forceFavorite={forceFavorite} />
      </div>
    </div>
  );
}
