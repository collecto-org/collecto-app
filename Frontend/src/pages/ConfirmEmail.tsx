// src/pages/ConfirmEmail.tsx
import { useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useVerifyMutation } from "../services/authApi"; 

const ConfirmEmail = () => {
    const [confirmEmail, { isLoading, isSuccess, isError }] = useVerifyMutation();
    const { token } = useParams<{ token: string }>();
    // Extraer token de la query string
    useEffect(() => {
        console.log(token)

        if (token) {
            confirmEmail({ token });
        }
    }, [token, confirmEmail]);

    return (
        <div>
            hola
            {isLoading && <p>Confirmando tu correo...</p>}
            {isSuccess && <p>¡Correo confirmado con éxito!</p>}
            {isError && <p>Hubo un error al confirmar tu correo.</p>}
        </div>
    );
};

export default ConfirmEmail;
