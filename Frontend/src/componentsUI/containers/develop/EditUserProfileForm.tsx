import { useState } from "react";
import Button from "@/componentsUI/elements/Button";
import Icon from "@/componentsUI/elements/Icon";

export default function EditUserProfileForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: "Martin",
    lastName: "Rivas Reynoso",
    email: "test@hotmail.com",
    phone: "",
    bio: "",
    birthdate: "1977-07-18",
    gender: "Masculino",
    avatar: "https://github.com/mdo.png",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-4 text-sm text-darkblue">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={form.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <p className="text-gray-600 text-sm">Hola</p>
              <h2 className="text-xl font-bold text-darkblue uppercase">
                {form.firstName.toUpperCase()}
              </h2>
            </div>
          </div>
          <Button variant="turquoise" onClick={() => setIsEditing(true)}>
            Editar
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon name="mail" size={18} />
            <div>
              <p className="text-sage text-xs">Correo electrónico</p>
              <p>{form.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="user" size={18} />
            <div>
              <p className="text-sage text-xs">Nombre</p>
              <p>{form.firstName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="user" size={18} />
            <div>
              <p className="text-sage text-xs">Apellidos</p>
              <p>{form.lastName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="calendar" size={18} />
            <div>
              <p className="text-sage text-xs">Fecha de nacimiento</p>
              <p>{form.birthdate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="user" size={18} />
            <div>
              <p className="text-sage text-xs">Género</p>
              <p>{form.gender}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-6 text-sm text-darkblue">
      <h2 className="text-xl font-bold text-darkblue">Editar Perfil</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block mb-1 text-sage">Foto de perfil</label>
          <div className="flex items-center gap-4">
            <img
              src={form.avatar}
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
