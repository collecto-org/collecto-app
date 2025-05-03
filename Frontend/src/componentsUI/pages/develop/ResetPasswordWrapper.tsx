import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVerifyPasswordTokenMutation } from "@/services/authApi";
import ResetPasswordModal from "@/componentsUI/containers/develop/ModalResetPassword";

export default function ResetPasswordWrapper() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifyToken, { isLoading}] = useVerifyPasswordTokenMutation();
  const [validToken, setValidToken] = useState(false);

  useEffect(() => {
    if (token) {
      verifyToken({ token })
        .unwrap()
        .then(() => setValidToken(true))
        .catch(() => {
          alert("El enlace no es válido o ha expirado.");
          navigate("/"); // O redirige a /login o donde prefieras
        });
    }
  }, [token, verifyToken, navigate]);

  if (!token || isLoading) return null;

  return (
    validToken && (
      <ResetPasswordModal isOpen={true} token={token} onClose={() => navigate("/")} />
    )
  );
}
