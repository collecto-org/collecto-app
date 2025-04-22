
import Title from "@/componentsUI/components/develop/Title";
import PaginationBlock  from "../../containers/develop/PaginationBlock";
import SideBarMenu from "../../containers/develop/SidebarMenu";
import ProductGrid from "../../containers/develop/AdvertGrid"
import { useSelector } from "react-redux";
import { selectProductTypes } from "@/store/selectors/optionsSelectors";
import { RootState } from "@/store/store";
import { Advert } from "@/services/schemas/AdvertsSchemas";



interface FilteredAdvertSectionProps {
    headerLabel: string;
    label: string;
    adverts: Advert[]
}

export default function FiteredAdvertSection({
    headerLabel,
    label,  
    adverts,
}:FilteredAdvertSectionProps){

  const productTypes = useSelector((state:RootState) => selectProductTypes(state))
  
  if(productTypes){
    return (
            <div className="grid grid-cols-12 gap-1 px-1 py-1">
                <div className="col-span-12 md:col-span-3 flex  items-center  justify-center">
                    <Title 
                    headerLabel={headerLabel}
                    label={label}
                     />
        
                </div>
                
                <div className="col-span-12 md:col-span-9  flex items-end  justify-center ">
                  <PaginationBlock/>
                </div>
                
                <div className="col-span-12 md:col-span-3 border border-black">
                  <SideBarMenu 
                  title={"Tipo de producto"}
                  options={productTypes}
                  />
                </div>
        
                <div className="col-span-12 md:col-span-9 border border-black">
                  <ProductGrid adverts={adverts} />
                </div>
              </div>
    )}
}