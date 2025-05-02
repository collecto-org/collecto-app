import { useForm } from "react-hook-form"
import { z } from "zod";
import {  zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import InputField from "@/componentsUI/components/InputField";
import Button from "@/componentsUI/elements/Button";
import Title from "@/componentsUI/components/develop/Title";
import { useUpdatePasswordMutation } from "@/services/usersApi"
import {  ApiError } from "@/services/schemas"
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";
import MessageBanner from "@/componentsUI/elements/MessageBanner";
import Icon from "@/componentsUI/elements/Icon";

const passwordSchema = z.object({
    currentPassword: z.string().min(4, "debes introducir tu contraseña actual"),
    newPassword: z.string().min(8, "La contraseña debe de tener al menos 8 caracteres"),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden"
})

export default function UpdatePassword () {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } =useForm({
        resolver: zodResolver(passwordSchema)
    });

    const [updatePassword, { isLoading }] = useUpdatePasswordMutation ();
    const [serverError, SetServerError] = useState<string | null> (null);
    const [success, setSucess] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = async (data: { currentPassword: string, newPassword: string, confirmPassword: string}) =>{
        try{
            await updatePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            }).unwrap();
            setSucess(true)
        } catch(err){
            const apiError = err as ApiError
            SetServerError(apiError?.data?.message ?? "error al actualizar la contraseña")
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <Title headerLabel="Cambiar  Contraseña" centered={true}/>
            {isLoading && <LoadingSpinner message="Actualizando Contraseña"/>}
            {!isLoading && !success &&  (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y1 text-sm">
                    <div className="relative">
                    <InputField
                        label="Contraseña Actual"
                        name="currentPassword"
                        register={register}
                        type={showCurrentPassword ? "text" : "password"}
                        error={errors.currentPassword?.message}
                        props={{ placeholder: '********', className: 'pr-8' }}
                    />
                    <Icon
                        name={showCurrentPassword ? "closeEye" : "openEye"}
                        size={16}
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-[38px] cursor-pointer text-sage"
                    />
                    </div>
                    <div className="relative">
                    <InputField
                        label="Nueva Contraeña"
                        name="newPassword"
                        register={register}
                        type={showNewPassword ? "text" : "password"}
                        error={errors.newPassword?.message}
                        props={{ placeholder: '********', className: 'pr-8' }}
                    />
                        <Icon
                        name={showNewPassword ? "closeEye" : "openEye"}
                        size={16}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-[38px] cursor-pointer text-sage"
                    />
                    </div>
                    <div className="relative">
                    <InputField
                        label="Confirmar Contraeña"
                        name="confirmPassword"
                        register={register}
                        type={showConfirmPassword ? "text" : "password"}
                        error={errors.confirmPassword?.message}
                        props={{ placeholder: '********'}}
                    />

                    <Icon
                        name={showConfirmPassword ? "closeEye" : "openEye"}
                        size={16}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-[38px] cursor-pointer text-sage"
                    />
                    </div>
                    {serverError && <MessageBanner type="error" text={serverError}/>}
                    <Button type="submit" variant="primary" className="w-full">
                        Actualizar Contraseña
                    </Button>
                </form>
            )}
                    {success  && (
                        <MessageBanner type="success" text="Tu contraseña fue actualizada correctamente"/>
                    )}
        </div>
    )
}