import React from "react";

interface DropdownLabelProps {
  text: string;
}

export default function DropdownLabel({ text }: DropdownLabelProps) {
  return (
    <span className="px-3 py-1 bg-cream border border-turquoise rounded-full text-[0.7rem]]  text-darkblue font-quicksand flex items-center gap-1 hover:shadow-sm transition">
      {text}
      <svg
        className="w-3 h-3 text-darkblue"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}