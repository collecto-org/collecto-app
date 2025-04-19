import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Form from "../components/Form"
import InputField from "../components/InputField"
import Button from "../components/Button"
import { useLoginMutation } from "../../services/authApi"
import logo from "../../assets/logos/collecto.png"
import { Link, useNavigate } from "react-router-dom"
import "../../styles/index copy.css"
import { ApiError } from "../../services/schemas/AdvertsSchemas"

import { useState } from "react"
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
      username: "",
      password: "",
      rememberMe: false
    }
  })

  const [login,{isLoading}] = useLoginMutation()
  const [loginError, setLoginError] = useState<string | null>(null)

  const navigate = useNavigate()




  const onSubmit = async (data: { username: string; password: string; rememberMe: boolean }) => {
    try {
       await login(data).unwrap();
       navigate("/")
    } catch (err) {
      const apiError = err as ApiError;
      setLoginError(apiError?.data?.message ?? "Error desconocido")    }
  };

  return (

    <div className="login">
    <div className="form-container">
    <img src={logo} alt="logo" className="logo"/>        
      <Form onSubmit={handleSubmit(onSubmit)} >
        <InputField
          label="Nombre de usuario"
          props={{placeholder:"Usuario"}}
          name="username"
          register={register}
          type="text"
          error={errors.username?.message}
        />

        <InputField
          label="Password"
          props={{placeholder:"*****"}}
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
 
    <Button variant="login-button" tipe="primary-button" >
          {isLoading ? 'Cargando...' : 'Enviar'}
        </Button>
      
      {loginError && (
        <p className="text-red-500">
          {loginError}
        </p>
      )}  
    <Link to="/recover">Olvidé mi contraseña</Link>        
    <Button to="/register" variant="signup-button" tipe="secondary-button">Registrarme </Button>       
        
      </Form>
    </div>
    </div>

  )
}

export default LoginForm
