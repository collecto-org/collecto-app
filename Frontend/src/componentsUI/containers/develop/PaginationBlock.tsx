import SearchControls from "../../components/develop/SearchControls";
import PaginationControls from "../../components/develop/PaginationControls";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";



interface PaginationBlockProps{
  currentPage: number;
  totalPages: number;
  pageSize:number;
  pageSizeOptions?: number[];
  onPageChange:(page:number) =>void;
  onPageSizeChange:(size:number) =>void;

}

export default function PaginationBlock({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,

}:PaginationBlockProps) {
  return (
    <div className="bg-white rounded-md  flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
      <SearchControls />
      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}/>
    </div>
  );
}
