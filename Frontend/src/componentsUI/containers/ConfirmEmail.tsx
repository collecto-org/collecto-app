// src/pages/ConfirmEmail.tsx
import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useVerifyMutation } from "../../services/authApi"; 
import logo from "../../assets/logos/collecto.png"


const ConfirmEmail = () => {
    const [confirmEmail, { isLoading, isSuccess, isError }] = useVerifyMutation();
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate()
    // Extraer token de la query string
    useEffect(() => {
        console.log(token)

        if (token) {
            confirmEmail({ token });
        }
    }, [token, confirmEmail]);

    useEffect(() => {
        if (isSuccess) {
          const timeout = setTimeout(() => {
            navigate('/login');
          }, 2000);
    
          return () => clearTimeout(timeout); 
        }
      }, [isSuccess, navigate]);
      
    return (
        <div className="login">
    <div className="form-container">
        <img src={logo} alt="logo" className="logo"/>  
            {isLoading && <p className="text-black">Confirmando tu correo...</p>}
            {isSuccess && <p className="text-black">¡Correo confirmado con éxito!</p>}
            {isError && <p className="text-black">Hubo un error al confirmar tu correo.</p>}
        </div>
        </div>
    );
};

export default ConfirmEmail;
