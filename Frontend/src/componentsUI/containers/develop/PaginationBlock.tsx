import React from "react";
import SearchControls from "../../components/develop/SearchControls";
import PaginationControls from "../../components/develop/PaginationControls";



interface PaginationBlockProps{
  currentPage: number;
  totalPages: number;
  pageSize:number;
  pageSizeOptions?: number[];
  onPageChange:(page:number) =>void;
  onPageSizeChange:(size:number) =>void;
  searchTerm:string;
  onSearch:(query:string)=> void;
}

export default function PaginationBlock({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  searchTerm,
  onSearch,
}:PaginationBlockProps) {
  return (
    <div className="bg-white rounded-md  flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
      <SearchControls 
        searchTerm={searchTerm}
        onSearch={onSearch} />
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
