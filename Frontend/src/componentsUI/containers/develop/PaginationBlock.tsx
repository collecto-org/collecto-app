import SearchControls from "../../components/develop/SearchControls";
import PaginationControls from "../../components/develop/PaginationControls";




export default function PaginationBlock() {
  return (
    <div className="bg-white rounded-md  flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
      <SearchControls />
      <PaginationControls />
    </div>
  );
}
