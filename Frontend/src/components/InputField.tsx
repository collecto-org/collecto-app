import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type InputFieldProps<T extends FieldValues> = {
  label: string
  name: Path<T>
  register: UseFormRegister<T>
  error?: string
  type?: string
  props?: React.InputHTMLAttributes<HTMLInputElement>
  className?: string
}

export default function InputField<T extends FieldValues>({
  label,
  name,
  register,
  error,
  type = "text",
  props,
  className
}: InputFieldProps<T>) {
  const isCheckbox = type === "checkbox"

  return (
    <div className={`input-field ${isCheckbox ? "checkbox-field" : ""}`}>
      {isCheckbox ? (
        <label className="checkbox-label">
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
          <label className="input-label">{label}</label>
          <input
            {...register(name)}
            type={type}
            {...props}
            className={`input ${className || ""}`}
          />
        </>
      )}
      {error && <p className="input-error">{error}</p>}
    </div>
  )
}
