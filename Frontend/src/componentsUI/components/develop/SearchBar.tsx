import { setFilter } from "@/store/slices/advertsSlice";
import { useForm } from "react-hook-form";
import { FiX, FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

type SearchBarProps = {
  placeholder?: string;
  width?: string;
};

type FormValues = { //  esquema del useForm
  search: string;
};

export default function SearchBar({
  placeholder = "Buscar...",
  width = "w-full",
}: SearchBarProps) {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();

  const isAdvertDetailPage = /^\/adverts\/[^/]+$/.test(location.pathname);

  const { register, watch, setValue } = useForm<FormValues>({  //  useForm para manejar los input
    defaultValues: { search: "" }, //  Valores por defecto del useForm
  });

  const searchValue = watch("search"); //  aqui esta disponible el valor de cada punto del formulario

  const handleSearch = () => {
  dispatch(setFilter({searchTerm:searchValue,limit:12})) 
  if (isAdvertDetailPage) {
    navigate("/"); // redirige al Home si estás en el detalle
  }
}; 


  const clearSearch = () => {
    setValue("search", ""); //  borrar valores deluseForm
     dispatch(setFilter({title:"",limit:12})) //  borrar valores del filtro
  };

  return (
    <div className={`flex items-center bg-lightgray rounded-full px-4 ${width}`}>
      <input
        type="text"
        {...register("search")}
        placeholder={placeholder}
        className="flex-1 bg-transparent py-2 outline-none text-sm text-darkblue text-[.9rem]"
      />

      {searchValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="text-darkblue text-sm px-2 hover:text-coral"
        >
          <FiX />
        </button>
      )}

      <button
        type="button"
        onClick={handleSearch}
        className="text-darkblue text-sm px-2 hover:text-coral"
      >
        <FiSearch />
      </button>
    </div>
  );
}
