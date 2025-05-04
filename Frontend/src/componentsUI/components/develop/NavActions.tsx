import { NavLink } from "react-router-dom";
import { User } from "@/services/schemas/UserSchemas";
import useLogoutHandler from "@/hooks/useLogoutHandler";
import Button from "@/componentsUI/elements/Button";
import { FiPlus } from "react-icons/fi";

interface NavActionsprops {
  user: User;
  openLoginModal: () => void;
  openRegisterModal: () => void;
}

export default function NavActions({
  user,
  openLoginModal,
  openRegisterModal,
}: NavActionsprops) {
  const { handleLogout } = useLogoutHandler();

  if (!user.username) {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <Button variant="primary" size="md" onClick={openLoginModal}>
          Haz login
        </Button>

        <Button variant="outlined" size="md" onClick={openRegisterModal}>
          Registrate
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <NavLink to="/new-advert">
          <Button
            variant="primary"
            size="md"
            className="flex items-center gap-1 pl-2"
          >
            <FiPlus className="w-5 h-5" />
            Carga un anuncio
          </Button>
        </NavLink>
        <Button onClick={handleLogout} variant="outlined" size="md">
          Cerrar sesión
        </Button>
      </div>
    );
  }
}
