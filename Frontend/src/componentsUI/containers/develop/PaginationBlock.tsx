import PaginationControls from "../../components/develop/PaginationControls";

export default function PaginationBlock() {
  return (
    <div className="bg-white rounded  flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
      <PaginationControls />
    </div>
  );
}
