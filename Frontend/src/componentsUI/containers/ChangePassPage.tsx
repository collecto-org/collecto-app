// src/pages/ConfirmEmail.tsx
import { useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useVerifyPasswordTokenMutation } from "../../services/authApi";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassPage = () => {
    const [verifyToken, { isLoading, isSuccess, isError }] = useVerifyPasswordTokenMutation();
    const { token } = useParams<{ token: string }>();

    useEffect(() => {
        console.log(token)

        if (token) {
            verifyToken({ token });
        }
    }, [token, verifyToken]);

    return (
        <div>
            hola
            {isLoading && <p>Confirmando el token..</p>}
            {isSuccess && token && <ChangePasswordForm token={token}/>}
            {isError && <p>Hubo un error al confirmar el token.</p>}
        </div>
    );
};

export default ChangePassPage;
