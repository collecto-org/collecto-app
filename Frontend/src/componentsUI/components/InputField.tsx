import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputFieldProps<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  type?: string;
  props?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
};

export default function InputField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  props,
  className,
}: InputFieldProps<T>) {
  const isCheckbox = type === "checkbox";

  return (
    <div className="flex flex-col gap-1 w-full">
      {isCheckbox ? (
        <label className="flex items-center gap-2 text-sm">
          <input
            {...register(name)}
            type="checkbox"
            {...props}
            className={`input-checkbox ${className || ""}`}
          />
          {label}
        </label>
      ) : (
        <>
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
          <input
            {...register(name)}
            type={type}
            {...props}
            className={`w-full p-2 border border-gray-300 rounded-md ${className || ""}`}
          />
        </>
      )}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
