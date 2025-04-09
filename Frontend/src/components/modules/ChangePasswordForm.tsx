import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Form from "../Form"
import InputField from "../InputField"
import Button from "../Button"

const schema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  confirmPassword:z.string(),
  consent:z.boolean()
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // El error aparece en el campo confirmPassword
    message: "Las contraseñas no coinciden"
  })

function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = (data: {  password: string; confirmPassword: string; }) => {
    console.log("Datos del formulario:", data) //TODO conectar con el endpoint
  }

  return (
    <div className="container">
        
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Cambiar contraseña</h2>

        <InputField
          label="Contraseña"
          name="password"
          register={register}
          type="password"
          error={errors.password?.message}
        />

        <InputField
          label="Confirmar contraseña"
          name="confirmPassword"
          register={register}
          type="password"
          error={errors.confirmPassword?.message}
        />

        <Button className="submit-button">Enviar</Button>
      </Form>
    </div>
  )
}

export default ChangePasswordForm
