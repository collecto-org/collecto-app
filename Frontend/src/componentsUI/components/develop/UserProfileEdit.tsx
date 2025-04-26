
import { useState } from "react"
import Button from "@/componentsUI/elements/Button";
import { useEditMeMutation } from "@/services/usersApi";
import { ChangeEvent, FormEvent } from "react";

interface UserProfileEditFormProps {
  form: {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    birthdate: string;
    gender: string;
    username: string;
    location: string,
  };
  setForm: (form: any) => void;
  setIsEditing: (editing: boolean) => void; 
}

export default function UserProfileEditForm({ form, setForm, setIsEditing }: UserProfileEditFormProps) {
  
  const [images, setImages] = useState<File[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };



    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const selectedFiles = Array.from(e.target.files);
      if (images.length + selectedFiles.length > 1) {
        alert("Solo puedes subir una imagen");
        return;
      }
      //setImages([...images, ...selectedFiles]);
      const newImages = [...images, ...selectedFiles];
      setImages(newImages);

      if (newImages.length > 0) {
        const previewUrl = URL.createObjectURL(newImages[0]);
        setForm((prev: any) => ({
          ...prev,
          avatarUrl: previewUrl,
        }));
      }

    };

  
   const [editme] = useEditMeMutation();

   const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      
      formData.append('email', form.email);
      formData.append('firstName', form.firstName);
      formData.append('lastName', form.lastName);
      formData.append('phone', form.phone);
      formData.append('bio', form.bio);
      formData.append('dateOfBirth', form.birthdate);
      formData.append('location', form.location);
  
      if (images.length > 0) {
        formData.append('image', images[0]);
      }
  
      const updatedUserResponse = await editme({ formData }).unwrap(); 
  
      setForm({
        ...form,
        avatarUrl: updatedUserResponse.avatarUrl, 
      });
  
      setIsEditing(false);
      console.log("Perfil actualizado correctamente:", updatedUserResponse);
      
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };
  
  
   
  return (
    <form className="space-y-6 text-sm text-darkblue" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-darkblue">Editar Perfil</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="flex items-center gap-4 w-full">
          <img
            src={form.avatarUrl || "/assets/default-avatar-mas.jpg"}
            alt="avatar preview"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-xs"
          />
          <div className="flex-1">
            <label className="block mb-1 text-black">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              disabled
              className="border px-3 py-2 rounded bg-gray-100 text-gray-500 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
