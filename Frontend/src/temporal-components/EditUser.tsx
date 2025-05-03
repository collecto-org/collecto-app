import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";
import { useNavigate } from "react-router-dom";
import { useEditMeMutation } from "@/services/usersApi";
import { User } from "@/services/schemas/UserSchemas";
import { useEffect, useState } from "react";

export const UserSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es obligatorio"),
  email: z.string().email("El correo electrónico no es válido"),
  firstName: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  phone: z.string().optional(),
  location: z.string().optional(),
  avatarUrl: z.string().optional(),
  bio: z.string().optional(),
});

type FormData = z.infer<typeof UserSchema>;

function Edituser() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => selectUser(state));
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const [EdituserMutation] = useEditMeMutation();
  const userToEdit = user
    ? {
        username: user.username ?? "",
        email: user.email ?? "",
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        phone: user.phone ?? "",
        location: user.location ?? "",
        avatarUrl: user.avatarUrl ?? "",
        bio: user.bio ?? "",
      }
    : {};

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user.avatarUrl || null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserSchema),
    mode: "onSubmit",
    defaultValues: userToEdit,
  });

  useEffect(() => {
    if (user) {
      reset(userToEdit);
      setAvatarPreview(userToEdit.avatarUrl || null);
    }
  }, [user, reset]);

  const handleAvatarChange = (avatar: React.ChangeEvent<HTMLInputElement>) => {
    const file = avatar.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: User) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      await EdituserMutation({ formData });
    } catch (err) {
      console.log(err);
    }
  };

  const fields: { name: keyof User; label: string; type?: string }[] = [
    { name: "username", label: "Nombre de usuario" },
    { name: "email", label: "Correo electrónico", type: "email" },
    { name: "firstName", label: "Nombre" },
    { name: "lastName", label: "Apellido" },
    { name: "phone", label: "Teléfono" },
    { name: "location", label: "Ubicación" },
    { name: "bio", label: "Biografía" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto p-4 bg-white shadow rounded-xl"
    >
      {fields.map(({ name, label, type }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="capitalize text-sm text-gray-700">
            {label}
          </label>
          <input
            id={name}
            type={type || "text"}
            {...register(name)}
            className="border rounded px-3 py-2"
          />
          {errors[name] && (
            <span className="text-red-500 text-xs mt-1">
              {errors[name]?.message?.toString()}
            </span>
          )}
        </div>
      ))}

      {/* Avatar image field */}
      <div className="flex flex-col">
        <label htmlFor="avatarUrl" className="capitalize text-sm text-gray-700">
          Avatar
        </label>
        <input
          id="avatarUrl"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="border rounded px-3 py-2"
        />
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Avatar preview"
            className="mt-2 w-24 h-24 object-cover rounded-full"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
      >
        Enviar
      </button>
    </form>
  );
}

export default Edituser;
