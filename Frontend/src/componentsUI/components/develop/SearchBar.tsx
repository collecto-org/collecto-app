import { setFilter } from "@/store/slices/advertsSlice";
import { useForm } from "react-hook-form";
import { FiX, FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

type SearchBarProps = {
  placeholder?: string;
  width?: string;
};

type FormValues = {
  //  esquema del useForm
  search: string;
};

export default function SearchBar({
  placeholder = "Buscar...",
  width = "w-full",
}: SearchBarProps) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const isAdvertDetailPage = /^\/adverts\/[^/]+$/.test(location.pathname);

  const { register, watch, setValue } = useForm<FormValues>({
    defaultValues: { search: "" }, 
  });

  const searchValue = watch("search"); 

  const handleSearch = () => {
    dispatch(setFilter({ searchTerm: searchValue, page:1,limit: 12 }));
    if (isAdvertDetailPage) {
      navigate("/"); 
    }
  };

  const clearSearch = () => {
    setValue("search", ""); 
    dispatch(setFilter({ title: "", limit: 12 })); 
  };

  return (
    <div
      className={`flex items-center bg-lightgrey rounded-full px-4 ${width}`}
    >
      <input
        type="text"
        {...register("search")}
        placeholder={placeholder}
        className="flex-1 bg-transparent py-2 outline-none text-sm text-darkblue"
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
