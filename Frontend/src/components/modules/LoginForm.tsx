import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Form from "../Form"
import InputField from "../InputField"
import Button from "../Button"
import { useLoginMutation } from "../../services/authApi"
import { Meta } from "react-router-dom"

const schema = z.object({
  username: z.string().min(3,"El nombre de usuario es obligatorio"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  rememberMe:z.boolean()})

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      username: "user",
      password: "",
      rememberMe: false
    }
  })

  const [login,{data, error, isLoading}] = useLoginMutation()

  const onSubmit = async (data: { username: string; password: string; rememberMe: boolean }) => {
    try {
      const result = await login({username:data.username,password:data.password,rememberMe:data.rememberMe}).unwrap()
      console.log("Login exitoso")
      localStorage.setItem("token",result.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
        
      <Form onSubmit={handleSubmit(onSubmit)} className="form">
      <h2>Login</h2>
        <InputField
          label="username"
          name="username"
          register={register}
          type="text"
          error={errors.username?.message}
        />

        <InputField
          label="Password"
          name="password"
          register={register}
          type="password"
          error={errors.password?.message}
        />

        <InputField
          label="Recordar sesión"
          name="rememberMe"
          register={register}
          type="checkbox"
        />

    <Button className="submit-button" >
          {isLoading ? 'Cargando...' : 'Enviar'}
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
