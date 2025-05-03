import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/componentsUI/elements/Button";
import AuthModalLayout from "@/componentsUI/layouts/AuthModalLayout";
import MessageBanner from "@/componentsUI/elements/MessageBanner";
import {useState } from "react"
import { useDeleteMeMutation } from "@/services/usersApi"
import PasswordFieldWithToggle from "@/componentsUI/components/develop/PasswordFieldWithToggle";
import { useLogoutMutation } from "@/services/authApi";

const deleteSchema = z.object ({
    password: z.string().min(4, "debes ingresar tu contrasela para confirmar")
})

interface DeleteAccountModalprops {
    isOpen: boolean;
    onClose: () => void;
  }

export default function ModalDeleteAccount ({isOpen, onClose}: DeleteAccountModalprops){
    const {
        register,
        handleSubmit,
        formState:{ errors },
    } = useForm({
        resolver: zodResolver(deleteSchema)
    })

    const [deleteAccount, { isLoading }] = useDeleteMeMutation();
    const [logout] = useLogoutMutation()
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const onSubmit = async( data: { password: string }) =>{
        try {
            await deleteAccount({ password: data.password}).unwrap();
            setSuccess(true)
            await logout()
            setTimeout(() => {
                window.location.href = "/"
            }, 3000)
        } catch (err:any) {
            setError(err?.data?.message || "Error al elimianr la cuenta")
        }
    }

    if(!isOpen) return null
    
    return (
        <AuthModalLayout onClose={onClose} maxWidth="max-w-sm">
            <div className="text-sm space-y-4">
                <h2 className="text-lg font-bold text-darkblue"> Confirmar eliminación de cuenta</h2>
                <p className="text-sage">
                    Esta acción eliminará permanentemente tu cuenta. Ingresa tu contraseña para confirmar
                </p>
                {success? (
                    <MessageBanner type="success" text="Tu cuenta ha sido eliminada correctamente"/>
                ):(
                    <form onSubmit={handleSubmit(onSubmit)} className="sapce-y-4">
                        <PasswordFieldWithToggle
                            label="contraseña"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                        />
                        {error && <MessageBanner type="error" text={error}/>}
                        <div className="flex gap-2 justify-end">
                            <Button type="button" variant="turquoise" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="danger">
                                {isLoading ? "Eliminando...": "Confirmar y eliminar"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </AuthModalLayout>
    )

}