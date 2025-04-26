import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFilters } from "@/store/selectors/advertsSelectors";
import {  setFilter } from "@/store/slices/advertsSlice";

interface PaginationControlsProps {
  total?:number
}
export default function PaginationControls({total}:PaginationControlsProps) {
  const dispatch = useDispatch();


  const filters = useSelector(selectFilters);
  
  const limit = filters.limit ?? 12;
  const page = filters.page ?? 1;

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const isTotalValid = typeof total === "number" && !isNaN(total);
  const totalPages = isTotalValid ? Math.max(1, Math.ceil(total / limit)) : 1;

  if (!isTotalValid) {
    return (
      <div className="text-sm text-gray-500 px-2 py-1">
        Cargando paginación...
      </div>
    );
  }

  const handlePageChange = (direction: "prev" | "next") => {
    const newPage =
      direction === "prev"
        ? Math.max(currentPage - 1, 1)
        : Math.min(currentPage + 1, totalPages);

    setCurrentPage(newPage);
    dispatch(setFilter({ page: newPage }));
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    dispatch(setFilter({ limit: newLimit, page: 1 }));
    setCurrentPage(1);
  };

  const pageSizeOptions = [1, 6, 12];

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-[0.9rem] text-darkblue">
      <div className="flex items-center gap-2 relative">
        <span className="font-bold p-2">Resultado: {total} anuncios</span>
      </div>

      <div className="flex items-center gap-2 relative">
      <span className="font-medium">Total de anuncios: {total}</span>

        <span className="font-medium">Mostrar:</span>
        <select
          className="border-2 border-turquoise rounded-full px-3 py-1 text-turquoise font-quicksand appearance-none pr-8"
          value={limit}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / página
            </option>
          ))}
        </select>
        <svg
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-turquoise pointer-events-none"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="flex items-center gap-3">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange("prev")}
          className="px-3 py-1 border-2 border-turquoise rounded-full text-darkblue hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.293 16.293a1 1 0 010 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 111.414 1.414L8.414 10l5.293 5.293a1 1 0 010 1.414z" />
            </svg>
            Anterior
          </span>
        </button>

        <span className="text-darkblue">
          Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
        </span>

        <button
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange("next")}
          className="px-3 py-1 border-2 border-turquoise rounded-full text-darkblue hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span className="flex items-center gap-1">
            Siguiente
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7.707 3.707a1 1 0 010-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 11-1.414-1.414L11.586 10 6.293 4.707a1 1 0 011.414-1.414z" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
