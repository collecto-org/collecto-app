import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "@/services/authApi";
import { ApiError } from "@/services/schemas/AdvertsSchemas";
import Icon from "@/componentsUI/elements/Icon";
import AuthModalLayout from "@/componentsUI/layouts/AuthModalLayout";
import Button from "@/componentsUI/elements/Button";

const schema = z
  .object({
    email: z.string().email("Email no válido"),
    username: z.string().nonempty("El nombre de usuario es obligatorio"),
    firstName: z.string().nonempty("El nombre es obligatorio"),
    lastName: z.string().nonempty("Los apellidos son obligatorios"),
    password: z
      .string()
      .min(4, "La contraseña debe tener al menos 4 caracteres"),
    confirmPassword: z.string(),
    consent: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function ModalRegister({ isOpen, onClose, onLogin }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      username: "",
      password: "",
      lastName: "",
      firstName: "",
      confirmPassword: "",
      consent: false,
    },
  });

  const [registerApi, { isLoading, error, isSuccess }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      await registerApi(data).unwrap();
    } catch (err) {
      const apiError = err as ApiError;
      console.log(apiError?.data?.message ?? "Error desconocido");
    }
  };

  if (!isOpen) return null;

  return (
    <AuthModalLayout
      onClose={onClose}
      maxWidth="max-w-3xl"
      maxHeight="max-h-[90vh]"
    >
      <div className="text-center">
        <h2 className="text-lg font-bold text-darkblue mb-4">Registrarse</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs"
      >
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            {...register("firstName")}
            className="w-full border rounded p-2"
          />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Apellidos</label>
          <input
            {...register("lastName")}
            className="w-full border rounded p-2"
          />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border rounded p-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Nombre de usuario</label>
          <input
            type="text"
            {...register("username")}
            className="w-full border rounded p-2"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="block mb-1">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className="w-full border rounded p-2 pr-10"
          />
          <Icon
            name={showPassword ? "closeEye" : "openEye"}
            size={16}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 text-sage"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="block mb-1">Confirmar contraseña</label>
          <input
            type={showConfirm ? "text" : "password"}
            {...register("confirmPassword")}
            className="w-full border rounded p-2 pr-10"
          />
          <Icon
            name={showConfirm ? "closeEye" : "openEye"}
            size={16}
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-2 top-8 text-sage"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="col-span-2 flex items-start gap-2 mt-2">
          <input type="checkbox" {...register("consent")} className="mt-1" />
          <label htmlFor="consent" className="text-xs text-left text-dark">
            Acepto que Collecto.es me envíe notificaciones
          </label>
        </div>

        <div className="col-span-2 flex flex-col gap-2 items-center mt-4 text-[11px] text-sage">
          <p>*Campos obligatorios</p>
          <p>
            Al continuar estás aceptando el{" "}
            <a href="#" className="text-blue-600 underline">
              Aviso de privacidad
            </a>{" "}
            y los{" "}
            <a href="#" className="text-blue-600 underline">
              Términos y condiciones
            </a>{" "}
            de Collecto.
          </p>
          <p>
            ¿Ya tienes cuenta?{" "}
            <button
              type="button"
              className="text-blue-600 underline"
              onClick={onLogin}
            >
              Inicia sesión
            </button>
          </p>
        </div>

        {error && (
          <div className="col-span-2 text-red-500 bg-red-100 p-2 rounded">
            {(error as any).data?.message || "Error al crear el usuario"}
          </div>
        )}

        {isSuccess && (
          <div className="col-span-2 text-green-600 bg-green-100 p-2 rounded text-center">
            Usuario registrado. Verifica tu correo para activarlo
          </div>
        )}

        <div className="col-span-2 mt-4">
          <Button type="submit" variant="primary" className="w-full">
            {isLoading ? "Cargando..." : "Comenzar ahora"}
          </Button>
        </div>
      </form>
    </AuthModalLayout>
  );
}
