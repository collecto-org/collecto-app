import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/services/authApi";
import { useLazyGetMeQuery } from "@/services/usersApi";
import { useNavigate } from "react-router-dom";
import AuthModalLayout from "@/componentsUI/layouts/AuthModalLayout";
import Button from "@/componentsUI/elements/Button";
import InputField from "@/componentsUI/components/InputField";
import logo from "@/assets/logos/collecto.png";
import { ApiError } from "@/services/schemas/AdvertsSchemas";
import Title from "@/componentsUI/components/develop/Title";

const schema = z.object({
  username: z.string().min(3, "El nombre de usuario es obligatorio"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  rememberMe: z.boolean(),
});

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onRecoverPassword: () => void;
  onRegister: () => void;
  returnPath?: string;
}

export default function ModalLogin({ isOpen, onClose, onRecoverPassword, onRegister, returnPath }: ModalLoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const [login, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [trigger] = useLazyGetMeQuery();
  const navigate = useNavigate();

  const from = returnPath || "/";

  const onSubmit = async (data: { username: string; password: string; rememberMe: boolean }) => {
    try {
      await login(data).unwrap();
      await trigger({});
      navigate(from, { replace: true });
      window.location.reload()
      onClose();
    } catch (err) {
      const apiError = err as ApiError;
      setLoginError(apiError?.data?.message ?? "Error desconocido");
    }
  };

  if (!isOpen) return null;

  return (
    <AuthModalLayout onClose={onClose} maxWidth="max-w-sm" maxHeight="max-h-[90vh]">
      <div className="flex flex-col items-center">
        <img src={logo} alt="Logo Collecto" className="h-16 mb-6" />
        <Title
            headerLabel="Inicio de Sesión"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 text-xs">
          <InputField
            label="Nombre de usuario"
            name="username"
            register={register}
            type="text"
            error={errors.username?.message}
            props={{ placeholder: "Usuario" }}
          />

          <InputField
            label="Contraseña"
            name="password"
            register={register}
            type="password"
            error={errors.password?.message}
            props={{ placeholder: "*****" }}
          />

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("rememberMe")} />
            <span className="text-sm">Recordar sesión</span>
          </div>

          {loginError && <p className="text-red-500 text-xs text-center">{loginError}</p>}

          <Button type="submit" variant="primary" className="w-full">
            {isLoading ? "Cargando..." : "Ingresar"}
          </Button>

          <div className="flex justify-between items-center text-xs text-sage mt-4">
            <button
              type="button"
              className="text-blue-600 hover:underline"
              onClick={onRecoverPassword}
            >
              Olvidé mi contraseña
            </button>
           
            <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={onRegister}
              >
                Registrarme
            </button>
          </div>
        </form>
      </div>
    </AuthModalLayout>
  );
}
