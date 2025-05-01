import Title from "@/componentsUI/components/develop/Title";
import PaginationBlock from "../../containers/develop/PaginationBlock";
import SideBarMenu from "../../containers/develop/SidebarMenu";
import ProductGrid from "../../containers/develop/AdvertGrid";
import { useSelector } from "react-redux";
import { selectProductTypes } from "@/store/selectors/optionsSelectors";
import { RootState } from "@/store/store";
import { Advert } from "@/services/schemas/AdvertsSchemas";
import { useState } from "react";

interface FilteredAdvertSectionProps {
  headerLabel: string;
  label: string;
  adverts: {adverts:Advert[],total:string};
  openLoginModal: () => void;
}

export default function FiteredAdvertSection({
  headerLabel,
  label,
  adverts,
  openLoginModal
}: FilteredAdvertSectionProps) {
  const productTypes = useSelector((state: RootState) =>
    selectProductTypes(state)
  );
  if (productTypes) {
    return (
      <div className="grid grid-cols-12 gap-1 px-1 py-1">
        <div className="col-span-12 md:col-span-3 flex  items-start justify-start pt-2 pb-4">
          <Title headerLabel={headerLabel} label={label} />
        </div>

        <div className="col-span-12 md:col-span-9  flex items-end  justify-start">
          <PaginationBlock total={Number(adverts.total)} />
        </div>

        <div className="col-span-12 md:col-span-3">
          <SideBarMenu title={""} options={productTypes} />
        </div>

        <div className="col-span-12 md:col-span-9 pt-2">
          <ProductGrid adverts={adverts.adverts} openLoginModal={openLoginModal} />
        </div>
      </div>
    );
  }
}
