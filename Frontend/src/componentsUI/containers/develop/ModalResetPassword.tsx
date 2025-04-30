import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@/componentsUI/elements/Button"
import InputField from "@/componentsUI/components/InputField"
import AuthModalLayout from "@/componentsUI/layouts/AuthModalLayout"
import { useState } from "react"
import { useChangePasswordMutation } from "@/services/authApi"
import { ApiError } from "@/services/schemas"
import Logo from "@/componentsUI/elements/Logo"
import Title from "@/componentsUI/components/develop/Title"


interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    token: string;
}

const passwordSchema = z
.object({
    newPassword: z.string().min(8, "Debe tener al menos 8 caracteres"),
    confirmPassword: z.string(),
})
.refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message:"las contraseñas no coinciden"
})

export default function ResetPasswordModal({
        isOpen,
        onClose,
        token,
    }: ResetPasswordModalProps) {
        const {
            register,
            handleSubmit,
            formState: { errors },
    } = useForm({
        resolver: zodResolver(passwordSchema),
    })

    const [changePassword, { isLoading }] = useChangePasswordMutation();
    const [serverError, setServerError ] = useState<string | null> (null);
    const [success, setSuccess ] = useState(false)

    const onSubmit = async (data: {newPassword: string; confirmPassword:string}) => {
        try {
            await changePassword({data: {newPassword: data.newPassword}, token}).unwrap();
            setSuccess(true)
        } catch (err) {
            const apiError = err as ApiError;
            setServerError(apiError?.data?.message)
        }
    }

    if(!isOpen) return null;

    return (
        <AuthModalLayout onClose={onClose} maxWidth="max-w-sm" maxHeight="max-h-[90vh]">
          <div className="flex flex-col items-center">
            <img src="/logos/collecto.png" alt="Logo Collecto" className="h-16 mb-6" />
      
            <Title headerLabel="Restablecer contraseña" />
      
            {!success ? (
              <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 text-xs">
                <InputField
                  label="Nueva contraseña"
                  name="newPassword"
                  register={register}
                  type="password"
                  error={errors.newPassword?.message}
                  props={{ placeholder: "********" }}
                />
                <InputField
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  register={register}
                  type="password"
                  error={errors.confirmPassword?.message}
                  props={{ placeholder: "********" }}
                />
      
                {serverError && (
                  <p className="text-red-500 text-xs text-center">{serverError}</p>
                )}
      
                <Button type="submit" variant="primary" className="w-full">
                  {isLoading ? "Cargando..." : "Restablecer contraseña"}
                </Button>
              </form>
            ) : (
              <div className="text-green-600 font-medium text-center">
                Tu contraseña ha sido restablecida correctamente.
              </div>
            )}
          </div>
        </AuthModalLayout>
      );
      

}