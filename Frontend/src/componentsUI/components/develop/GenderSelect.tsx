import { useGetGendersQuery } from "@/services/gendersApi";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner"; 

export default function GenderSelect() {
  const { data: genders = [], isLoading, isError } = useGetGendersQuery();

  if (isLoading) return <LoadingSpinner message="Cargando géneros..." />;
  if (isError) return <p className="text-red-500">Error al cargar géneros</p>;

  return (
    <div className="space-y-2">
      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
        Género
      </label>
      <select
        id="gender"
        name="gender"
        className="w-full border px-3 py-2 rounded"
      >
        <option value="">Seleccione género</option>
        {genders.map((gender) => (
          <option key={gender.code} value={gender.code}>
            {gender.label}
          </option>
        ))}
      </select>
    </div>
  );
}
