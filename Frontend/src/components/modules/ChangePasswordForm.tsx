import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Form from "../Form"
import InputField from "../InputField"
import Button from "../Button"
import { useChangePasswordMutation } from "../../services/authApi"
import logo from "../../assets/logos/collecto.png"
import { ApiError } from "../../services/schemas/AdvertsSchemas"
import { useState } from "react"
const schema = z.object({
  newPassword: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  confirmPassword:z.string()
  }).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], 
    message: "Las contraseñas no coinciden"
  })

  type Props = {
    token: string;
  };
function ChangePasswordForm({token}:Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      newPassword: "",
      confirmPassword:""
    }
  })

  const [change,{isLoading}] = useChangePasswordMutation()
  const [recoverError, setrecover] = useState<string | null>(null)




  const onSubmit = async (data: { newPassword:string }) => {
    try {
      console.log("hola")
       const res= await change({data,token}).unwrap();
       console.log(res)
    } catch (err) {
      const apiError = err as ApiError;
      setrecover(apiError?.data?.message ?? "Error desconocido")    }
  };

  return (
    <div className="login">
    <div className="form-container">
    <img src={logo} alt="logo" className="logo"/>        
      <Form onSubmit={handleSubmit(onSubmit)} >
        <InputField
          label="Nueva contraseña"
          props={{placeholder:"Tu email"}}
          name="newPassword"
          register={register}
          type="password"
          error={errors.newPassword?.message}
        />
        <InputField
          label="Confirma tu contraseña"
          props={{placeholder:"Tu email"}}
          name="confirmPassword"
          register={register}
          type="password"
          error={errors.confirmPassword?.message}
        />
 
 
    <Button variant="login-button" tipe="primary-button" >
          {isLoading ? 'Cargando...' : 'Enviar'}
        </Button>
      
{recoverError && (
  <p className="text-red-500">
    {recoverError}
  </p>
)} 
      </Form>
    </div>
    </div>
  )
}

export default ChangePasswordForm
