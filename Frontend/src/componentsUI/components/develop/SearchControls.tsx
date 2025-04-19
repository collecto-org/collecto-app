import  {useState} from "react"
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import DropdownLabel from "../../elements/DropdownLabel";
import { useDispatch } from "react-redux";
import { setFilter } from "@/store/slices/advertsSlice";






export default function SearchControls( ) {
  const dispatch = useDispatch()
  const [brand, setBrand] = useState("")
  const [filter, setFilterParams] = useState("filtrar por")

  const handleBrand = (selectedBrand: string) => {
    setBrand(selectedBrand);
    dispatch(setFilter({ brand: selectedBrand }));
  };

  const handleFilter = (filterParams: string) => {
    setFilterParams(filterParams);
    dispatch(setFilter({ sortBy: filterParams }));
  };

    
  console.log(brand)
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
            label={<DropdownLabel text={brand || "Marca"} />}
            onSelect={setBrand}
        >
        {brands.map((b) => (
          <Dropdown.Item key={b} onClick={() => handleBrand(b)}>
            {b}
          </Dropdown.Item>
        ))}
      </Dropdown> 
        
        <Dropdown
            label={<DropdownLabel text={filter} />}
            onSelect={setFilterParams}
          >

            {sortBy.map((f) => (
              <Dropdown.Item key={f} onClick={() => handleFilter(f)}>
                {f}
              </Dropdown.Item>
            ))}
        </Dropdown>
    </div>
  );
}
