import React from "react";
import SearchControls from "../../components/develop/SearchControls";
import PaginationControls from "../../components/develop/PaginationControls";

export default function PaginationBlock() {
  return (
    <div className="bg-white border shadow rounded-md p-4 flex flex-col md:flex-row gap-4 items-start justify-between">
      <SearchControls />
      <PaginationControls />
    </div>
  );
}
