import PaginationControls from "../../components/develop/PaginationControls";

interface PaginationBlock {
  total?:number
}
export default function PaginationBlock({total}:PaginationBlock) {
  return (
    <div className="bg-white rounded  flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
      <PaginationControls total={total} />
    </div>
  );
}
