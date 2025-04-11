import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Form from "../../components/Form"
import InputField from "../../components/InputField"
import Button from "../../components/Button"
import { useRecoverPassMutation } from "../../services/authApi"
import logo from "../../assets/logos/collecto.png"
import { ApiError } from "../../services/schemas"
import { useState } from "react"
const schema = z.object({
  email: z.string().email("Email no válido")})

function RecoverPassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: ""
    }
  })

  const [recover,{isLoading}] = useRecoverPassMutation()
  const [recoverError, setrecover] = useState<string | null>(null)




  const onSubmit = async (data: { email:string }) => {
    try {
       await recover(data).unwrap();
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
          label="Email"
          props={{placeholder:"Tu email"}}
          name="email"
          register={register}
          type="text"
          error={errors.email?.message}
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

export default RecoverPassForm
