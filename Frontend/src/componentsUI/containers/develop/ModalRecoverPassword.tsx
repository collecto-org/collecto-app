import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoverPassMutation } from "@/services/authApi";
import Button from "@/componentsUI/elements/Button";
import InputField from "@/componentsUI/components/InputField";
import AuthModalLayout from "@/componentsUI/layouts/AuthModalLayout";
import { useState } from "react";
import { ApiError } from "@/services/schemas/AdvertsSchemas";

interface ModalRecoverPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // AGREGADO para abrir el modal de "correo enviado"
}

const schema = z.object({
  email: z.string().email("Introduce un correo válido"),
});

export default function ModalRecoverPassword({ isOpen, onClose, onSuccess }: ModalRecoverPasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const [recoverPassword, { isLoading }] = useRecoverPassMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: { email: string }) => {
    try {
      await recoverPassword(data).unwrap();
      onSuccess(); // CERRAMOS este modal y abrimos el siguiente de "correo enviado"
    } catch (err) {
      const apiError = err as ApiError;
      setErrorMessage(apiError?.data?.message ?? "Error al enviar el correo");
    }
  };

  if (!isOpen) return null;

  return (
    <AuthModalLayout onClose={onClose}>
      <h2 className="text-center text-lg font-semibold text-darkblue mb-4">Recuperar contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          label="Email"
          name="email"
          register={register}
          type="email"
          error={errors.email?.message}
          props={{ placeholder: "Tu correo electrónico" }}
        />

        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

        <Button type="submit" variant="primary" className="w-full">
          {isLoading ? "Enviando..." : "Enviar instrucciones"}
        </Button>
      </form>
    </AuthModalLayout>
  );
}
