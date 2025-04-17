import React, { useState } from "react";
import Button from "../../elements/Button";
import { FiSearch, FiX } from "react-icons/fi"


export default function SearchBar(){
    const [query, setQuery] = useState("");

    const handleSearch = () =>{
        console.log("buscando: ", query)
    };

    return (
        <div className="flex items-center bg-lightgray rounded-full px-4 w-full">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca en todos los universos"
            className="flex-1 bg-transparent py-2 outline-none text-sm text-darkblue"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-darkblue text-lg px-2 hover:text-coral"
            >
              <FiX />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="text-darkblue text-lg px-2 hover:text-coral"
          >
            <FiSearch />
          </button>
        </div>
      );
}