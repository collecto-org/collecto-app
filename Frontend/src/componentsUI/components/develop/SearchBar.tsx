import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi"


interface SearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  width?: string;
}


export default function SearchBar({ placeholder,value, onChange, onSearch, width = "w-full" }: SearchBarProps){
    const [query, setQuery] = useState("");

    const handleSearch = () =>{
        console.log("buscando: ", value)
    };

    return (
        <div className={`flex items-center bg-lightgray rounded-full px-4 ${width}`}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-2 outline-none text-sm text-darkblue text-[.9rem]"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              className="text-darkblue text-sm px-2 hover:text-coral"
            >
              <FiX />
            </button>
          )}
          <button
            onClick={onSearch}
            className="text-darkblue text-sm px-2 hover:text-coral"
          >
            <FiSearch />
          </button>
        </div>
      );
}