import PaginationControls from "../../components/develop/PaginationControls";

interface PaginationBlock {
  total?:number
  pageLabel?:string
}
export default function PaginationBlock({total,pageLabel}:PaginationBlock) {
  return (
    <div className="bg-white rounded  flex flex-col md:flex-row gap-4 items-center md:items-center justify-between">
      <PaginationControls total={total} pageLabel={pageLabel} />
    </div>
  );
}
