import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Form from "../components/Form"
import InputField from "../components/InputField"
import Button from "../components/Button"
import { useRegisterMutation } from "../../services/authApi"
import { ApiError } from "../../services/schemas/AdvertsSchemas"
import AuthLayout from "@/componentsUI/layouts/develop/AuthLayout";
import "../../styles/index copy.css"

const schema = z.object({
  email: z.string().email("Email no válido"),
  username:z.string().nonempty("El nombre de usuario es obligatorio"),
  firstName:z.string().nonempty("El nombre es obligatorio"),
  lastName:z.string().nonempty("Los apellidos son obligatorios"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  confirmPassword:z.string(),
  consent:z.boolean()
  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], 
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
      email: "",
      username:"",
      password: "",
      lastName:"",
      firstName:"",
      confirmPassword: "",
      consent: false
    }
  })

  const [registerApi,{isLoading}] = useRegisterMutation()

  const onSubmit = async (data: {username:string; email: string; password: string; firstName:string; lastName:string;  }) => {
try {
      const result = await registerApi(data).unwrap();
      console.log(result)
    } catch (err) {
      const apiError = err as ApiError;
      console.log(apiError?.data?.message ?? "Error desconocido");
    }  }

  return (
    <AuthLayout>
    <div className="login">
        
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
          label="Nombre de usuario"
          name="username"
          register={register}
          type="text"
          error={errors.username?.message}
        />
        <InputField
          label="Nombre"
          name="firstName"
          register={register}
          type="text"
          error={errors.firstName?.message}
        />
        <InputField
          label="Apellidos"
          name="lastName"
          register={register}
          type="text"
          error={errors.lastName?.message}
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

        <Button variant="login-button" tipe="primary-button" >
              {isLoading ? 'Cargando...' : 'Enviar'}
            </Button>      </Form>
        </div>
    </AuthLayout>
  )
}

export default RegisterForm
