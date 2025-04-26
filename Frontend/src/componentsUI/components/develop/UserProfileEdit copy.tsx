import Button from "@/componentsUI/elements/Button";
import { ChangeEvent } from "react";


interface UserProfileEditFormProps {
  form: {
    username:string,
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    birthdate: string;
    gender: string;
  };
  setForm: (form: any) => void;
  setIsEditing: (editing: boolean) => void;
}

export default function UserProfileEditForm({ form, setForm, setIsEditing }: UserProfileEditFormProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };
  console.log("nombre de usuario: ", form)
  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev: any) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="space-y-6 text-sm text-darkblue">
      <h2 className="text-xl font-bold text-darkblue">Editar Perfil</h2>
      <div className="md:col-span-2">
          <label className="block mb-1 text-sage">Foto de perfil</label>
          <div className="flex items-center gap-4">
            <img
              src={form.avatar || "/assets/default-avatar-mas.jpg"}
              alt="avatar preview"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-xs"
            />
          </div>
      </div>
        <div>
          <label className="block mb-1 text-black"> Nombre de usuario</label>
          <input 
            type="text" 
            name="username"
            value={form.username}
            disabled
            className="border px-3 py-2 rounded bg-gray-100 text-gray-500"
            />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div>
          <label className="block mb-1 text-sage">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sage">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Ej. 5527730937"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sage">Fecha de nacimiento</label>
          <input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sage">Género</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

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

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => setIsEditing(false)}>
          Cancelar
        </Button>
        <Button variant="turquoise" type="submit">
          Guardar
        </Button>
      </div>
    </form>
  );
}
