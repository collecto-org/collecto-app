import { ChangeEvent } from "react";

interface ProfileFormFieldsProps {
  form: any;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleEmailBlur: () => void;
  handleBirthdateBlur: () => void;
  emailValid: boolean;
  phoneValid: boolean;
  isCheckingEmail: boolean;
  isAdult: boolean;
  genders: { _id: string; label: string }[];
}

export default function ProfileFormFields({
  form,
  handleChange,
  handleEmailBlur,
  handleBirthdateBlur,
  emailValid,
  phoneValid,
  isCheckingEmail,
  isAdult,
  genders,
}: ProfileFormFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Email */}
      <div>
        <label className="block mb-1 text-sage">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleEmailBlur}
          className={`w-full border px-3 py-2 rounded ${emailValid ? "" : "border-red-500"}`}
        />
        {isCheckingEmail && (
          <p className="text-xs text-gray-500 mt-1">Validando correo...</p>
        )}
        {!emailValid && (
          <p className="text-red-500 text-xs mt-1">Por favor ingresa un correo válido.</p>
        )}
      </div>

      {/* Nombre */}
      <div>
        <label className="block mb-1 text-sage">Nombre</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Apellidos */}
      <div>
        <label className="block mb-1 text-sage">Apellidos</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="block mb-1 text-sage">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Ej. 5527730937"
          className={`w-full border px-3 py-2 rounded ${phoneValid ? "" : "border-red-500"}`}
        />
        {!phoneValid && (
          <p className="text-red-500 text-xs mt-1">El número debe tener exactamente 10 dígitos</p>
        )}
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label className="block mb-1 text-sage">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthdate"
          value={form.birthdate}
          onChange={handleChange}
          onBlur={handleBirthdateBlur}
          className={`w-full border px-3 py-2 rounded ${isAdult ? "" : "border-red-500"}`}
        />
        {!isAdult && (
          <p className="text-red-500 text-xs mt-1">
            El año debe ser correcto y debes ser mayor de 18 años
          </p>
        )}
      </div>

      {/* Género */}
      <div>
        <label className="block mb-1 text-sage">Género</label>
        <select
          name="gender"
          value={typeof form.gender === 'object' ? (form.gender as any)._id : form.gender}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione género</option>
          {genders.map((gender) => (
            <option key={gender._id} value={gender._id}>
              {gender.label}
            </option>
          ))}
        </select>
      </div>

      {/* Descripción personal */}
      <div className="md:col-span-2">
        <label className="block mb-1 text-sage">Descripción personal</label>
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          placeholder="Escribe algo sobre ti"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

    </div>
  );
}
