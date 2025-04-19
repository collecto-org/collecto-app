
import { useState, useEffect } from "react";
import Title from "@/componentsUI/components/develop/Title";
import PaginationBlock  from "../../containers/develop/PaginationBlock";
import SideBarMenu from "../../containers/develop/SidebarMenu";
import ProductGrid from "../../containers/develop/AdvertGrid"



interface FilteredAdvertSectionProps {
    headerLabel: string;
    label: string;
    totalAdverts: number;
    onFilterChange?: (pagenumber:number, pagesize: number) => void,
    barsidetitle: string, 
    barsideoptions: string [],
    adverts: any[]
}

export default function FiteredAdvertSection({
    headerLabel,
    label,
    totalAdverts,
    onFilterChange,
    barsidetitle,
    barsideoptions,
    adverts,
}:FilteredAdvertSectionProps){

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const totalitems = Number(totalAdverts)
    const totalPages = Math.ceil(totalitems/pageSize) 

    useEffect(() => {
        if(onFilterChange){
            onFilterChange(currentPage, pageSize)
        }
    },[currentPage, pageSize, onFilterChange])

    return (
            <div className="grid grid-cols-12 gap-1 px-1 py-1">
                <div className="col-span-12 md:col-span-3 flex  items-center  justify-center">
                    <Title 
                    headerLabel={headerLabel}
                    label={label}
                     />
        
                </div>
                
                <div className="col-span-12 md:col-span-9  flex items-end  justify-center ">
                  <PaginationBlock
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(size) =>{
                      setPageSize(size);
                      setCurrentPage(1);
                    }}
          
                  />
                </div>
                
                <div className="col-span-12 md:col-span-3 border border-black">
                  <SideBarMenu 
                  title={barsidetitle}
                  options={barsideoptions}
                  />
                </div>
        
                <div className="col-span-12 md:col-span-9 border border-black">
                  <ProductGrid adverts={adverts} />
                </div>
              </div>
    )
}