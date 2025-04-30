import { useLogoutMutation } from "@/services/authApi";
import { useNavigate } from "react-router-dom";

export default function useLogoutHandler() {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert("Hubo un problema al cerrar sesión, por favor intenta de nuevo.");
    }
  };

  return { handleLogout };
}
