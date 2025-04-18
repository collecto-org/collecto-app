import react, {useState} from "react"
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import DropdownLabel from "../../elements/DropdownLabel";


interface SearchControlsProps {
  searchTerm: string;
  onSearch: (query: string) => void;
}


export default function SearchControls( ) {
  const [brand, setBrand] = useState("Marca")
  const [filter, setFilter] = useState("filtrar por")

  const brands = [            
      "Funko",
      "Hot Toys",
      "Hasbro",
      "Neca",
      "Bandai",
      "Diamond Select Toys",
      "Dark Horse",
      "McFarlane Toys",
      "kidrobot"]

  const sortBy = [
    "Más vendido",
    "Nuevo Lanzamiento",
    "Menor precio",
    "Mayor precio",
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-[0.7rem]">
      <div className="flex-1 ">
        <SearchBar placeholder="Nombre, colección…"
          />
      </div>
      
      <Dropdown
            label={<DropdownLabel text={brand} />}
            onSelect={setBrand}
        >
        {brands.map((b) => (
          <Dropdown.Item key={b} onClick={() => setBrand(b)}>
            {b}
          </Dropdown.Item>
        ))}
      </Dropdown> 
        
        <Dropdown
            label={<DropdownLabel text={filter} />}
            onSelect={setFilter}
          >

            {sortBy.map((f) => (
              <Dropdown.Item key={f} onClick={() => setFilter(f)}>
                {f}
              </Dropdown.Item>
            ))}
        </Dropdown>
    </div>
  );
}
