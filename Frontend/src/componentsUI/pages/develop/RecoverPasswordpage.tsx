// src/pages/ChangePassPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyPasswordTokenMutation } from "@/services/authApi";
import ResetPasswordModal from "@/componentsUI/containers/develop/ModalResetPassword";
import MainLayout from "@/componentsUI/layouts/MainLayout";

export default function RecoverPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyToken, { isSuccess, isError }] = useVerifyPasswordTokenMutation();
  const [tokenChecked, setTokenChecked] = useState(false);

  useEffect(() => {
    let isMounted = true;
  
    if (token) {
      verifyToken({ token })
        .unwrap()
        .then(() => {
          if (isMounted) {
            setTimeout(() => setTokenChecked(true), 2000);
          }
        })
        .catch(() => {
          if (isMounted) {
            setTimeout(() => setTokenChecked(true), 2000);
          }
        });
    }
  
    return () => {
      isMounted = false;
    };
  }, [token, verifyToken]);
  

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh] bg-light px-4">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
          <h2 className="text-lg font-bold text-darkblue mb-4">Reestablecer contraseña</h2>

          {!tokenChecked && (
            <p className="text-sage text-sm">Verificando enlace de seguridad...</p>
          )}

          {tokenChecked && isError && (
            <p className="text-red-500 font-medium">
              Error al confirmar el token. Intenta solicitar uno nuevo.
            </p>
          )}

          {tokenChecked && isSuccess && token && (
            <>
              <p className="text-green-600 font-medium mb-4">
                Token verificado correctamente. Puedes restablecer tu contraseña.
              </p>
              <ResetPasswordModal isOpen={true} token={token} onClose={() => navigate("/")} />
            </>
          )}

        </div>
      </div>
    </MainLayout>
  );
}
