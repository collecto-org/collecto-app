import { ProductTypeSchema } from "@/services/schemas/UniverseSchemas";
import { setFilter } from "@/store/slices/advertsSlice";
import  { useState } from "react";
import { useDispatch } from "react-redux";

interface FiltersSidebarProps {
  title: string;
  options: ProductTypeSchema[];
  onSelect?: (option: string | null) => void;
}

export default function FiltersSidebar({ title, options, onSelect }: FiltersSidebarProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const dispatch = useDispatch()

  const handleClick = (option: string) => {
    setSelected(option);
    if(option === "Todos"){
      dispatch(setFilter({product_type:"",page:1}))} 
    else if(option){
      dispatch(setFilter({product_type:option,page:1}))} 
    onSelect?.(option);
  };

  return (
    <aside className="space-y-5 mt-4 pl-5 text-darkblue">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="space-y-4 ml-7 font-bold text-xs">
        {options.map((option) => (
          <li
            key={option._id}
            onClick={() => handleClick(option._id)}
            className={`cursor-pointer transition-colors ${
              selected === option._id ? "text-coral font-semibold" : "text-gray-600 hover:text-coral"
            }`}
          >
            {option.name}
          </li>
        ))}
      </ul>

    </aside>
  );
}
