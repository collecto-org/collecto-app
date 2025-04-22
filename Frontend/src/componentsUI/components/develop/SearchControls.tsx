import  {useState} from "react"
import SearchBar from "./SearchBar";
import Dropdown from "./Dropdown";
import DropdownLabel from "../../elements/DropdownLabel";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/slices/advertsSlice";
import { RootState } from "@/store/store";
import { selectBrands } from "@/store/selectors/optionsSelectors";






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

    const brands = useSelector((state:RootState) => selectBrands(state))

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
        >{brands && brands.length > 0 ? (
          brands.map((b) => (
            <Dropdown.Item key={b._id} onClick={() => handleBrand(b._id)}>
              {b.name}
            </Dropdown.Item>
          ))
        ) : (
          <span className="px-4 py-2 text-sm text-gray-500">No hay marcas</span>
        )}
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
