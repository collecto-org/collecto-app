import React, { useState } from "react";

interface FiltersSidebarProps {
  title: string;
  options: string[];
  onSelect?: (option: string | null) => void;
}

export default function FiltersSidebar({ title, options, onSelect }: FiltersSidebarProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (option: string) => {
    setSelected(option);
    onSelect?.(option);
  };

  const handleReset = () => {
    setSelected(null);
    onSelect?.(null);
  };

  return (
    <aside className="space-y-5 mt-4 pl-5 text-darkblue">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="space-y-4 ml-7 font-bold text-xs">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => handleClick(option)}
            className={`cursor-pointer transition-colors ${
              selected === option ? "text-coral font-semibold" : "text-gray-600 hover:text-coral"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>

    </aside>
  );
}
