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

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "email@example.com",
      password: "",
      confirmPassword: "",
      consent: false
    }
  })

  const onSubmit = (data: { email: string; password: string; confirmPassword: string; consent: boolean; }) => {
    console.log("Datos del formulario:", data) //TODO conectar con el endpoint
  }

  return (
    <div className="container">
        
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Registrarse</h2>
        <InputField
          label="Email"
          name="email"
          register={register}
          type="email"
          error={errors.email?.message}
        />

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

        <InputField
          label="Acepto que Collecto.es me envíe notificaciones"
          name="consent"
          register={register}
          type="checkbox"
        />

        <Button className="submit-button">Enviar</Button>
      </Form>
    </div>
  )
}

export default RegisterForm
