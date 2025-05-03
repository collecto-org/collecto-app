import { ProductTypeSchema } from "@/services/schemas/UniverseSchemas";
import { setFilter } from "@/store/slices/advertsSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface FiltersSidebarProps {
  title: string;
  options: ProductTypeSchema[];
  onSelect?: (option: string | null) => void;
}

export default function FiltersSidebar({
  title,
  options,
  onSelect,
}: FiltersSidebarProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleClick = (option: string) => {
    setSelected(option);
    if (option === "Todos") {
      dispatch(setFilter({ product_type: "", page: 1 }));
    } else if (option) {
      dispatch(setFilter({ product_type: option, page: 1 }));
    }
    onSelect?.(option);
  };

  return (
    <div className="text-darkblue mt-4">
      {/* Desktop sidebar */}
      <aside className="hidden md:block space-y-5 pl-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <ul className="space-y-4 ml-7 font-bold text-md">
          {options.map((option) => (
            <li
              key={option._id}
              onClick={() => handleClick(option._id)}
              className={`cursor-pointer transition-colors ${
                selected === option._id
                  ? "text-coral font-semibold"
                  : "text-gray-600 hover:text-coral"
              }`}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile dropdown */}
      <div className="block md:hidden space-y-2">
        <label className="text-sm font-semibold">{title}</label>
        <select
          value={selected || ""}
          onChange={(e) => handleClick(e.target.value)}
          className="w-full border rounded px-3 py-2 text-md"
        >
          <option value="">Tipo de producto</option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
