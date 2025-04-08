import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Form from "../components/Form"
import InputField from "../components/InputField"
import Button from "../components/Button"

const schema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  confirmPassword:z.string(),
  consent:z.boolean()
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // El error aparece en el campo confirmPassword
    message: "Las contraseñas no coinciden"
  })

function RecoverForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "email@example.com"
    }
  })

  const onSubmit = (data: { email: string;  }) => {
    console.log("Datos del formulario:", data) //TODO conectar con el endpoint
  }

  return (
    <div className="container">
        
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Recuperar usuario</h2>
        <InputField
          label="Email"
          name="email"
          register={register}
          type="email"
          error={errors.email?.message}
        />

        <Button className="submit-button">Enviar</Button>
      </Form>
    </div>
  )
}

export default RecoverForm
