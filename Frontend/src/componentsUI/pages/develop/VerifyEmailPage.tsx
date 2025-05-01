import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useVerifyMutation } from "@/services/authApi";
import MessageBanner from "@/componentsUI/elements/MessageBanner";
import MainLayout from "@/componentsUI/layouts/MainLayout";

export default function VerifyEmailPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [verifyEmail] = useVerifyMutation();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verify = async () => {
      if (!token) return;

      try {
        await verifyEmail({ token }).unwrap();
        setStatus("success");
        setTimeout(() => navigate("/"), 3000); 
      } catch (error) {
        setStatus("error");
      }
    };

    verify();
  }, [token, verifyEmail, navigate]);

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        {status === "loading" && (
          <MessageBanner type="info" text="Verificando tu correo, por favor espera..." />
        )}
        {status === "success" && (
          <MessageBanner type="success" text="¡Correo verificado exitosamente! Ahora puedes iniciar sesión." />
        )}
        {status === "error" && (
        <div className="flex flex-col items-center gap-4">
            <MessageBanner type="error" text="El enlace de verificación es inválido o ha expirado." />
            <button
            onClick={() => navigate("/")}
            className="bg-turquoise text-white font-semibold py-2 px-4 rounded hover:bg-darkblue transition"
            >
            Ir al Login
            </button>
        </div>
        )}
      </div>
    </MainLayout>
  );
}
