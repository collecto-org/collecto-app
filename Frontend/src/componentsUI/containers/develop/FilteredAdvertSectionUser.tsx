import PaginationBlock from "./PaginationBlock";
import ProductGrid from "./AdvertGrid";
import { useSelector } from "react-redux";
import { selectProductTypes } from "@/store/selectors/optionsSelectors";
import { RootState } from "@/store/store";
import { Advert } from "@/services/schemas/AdvertsSchemas";

interface FilteredAdvertSectionProps {
  adverts: Advert[];
}

export default function FilteredAdvertSectionUser({
  adverts,
}: FilteredAdvertSectionProps) {
  const productTypes = useSelector((state: RootState) =>
    selectProductTypes(state)
  );

  if (!productTypes) return null;

  return (
    <div className="w-full">
      <div className="w-full space-y-4">
        <div className="flex justify-star">
          <PaginationBlock />
        </div>

        <ProductGrid adverts={adverts} forceFavorite />
      </div>
    </div>
  );
}
