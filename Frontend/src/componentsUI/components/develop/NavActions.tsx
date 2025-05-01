import { NavLink } from "react-router-dom";
import MaterialButton from "../../components/MaterialButton";
import { User } from "@/services/schemas/UserSchemas";
import useLogoutHandler from "@/hooks/useLogoutHandler";
import Button from "@/componentsUI/elements/Button";
import Button from "../Button";

interface NavActionsprops {
  user: User;
  openLoginModal: () => void;
  openRegisterModal: () => void
}


export default function NavActions({ user, openLoginModal, openRegisterModal,openRegisterModal }: NavActionsprops) {
  const { handleLogout } = useLogoutHandler();


  if (!user.username) {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <MaterialButton
          variant="filled"
          className="text-sm px-4 py-1.5"
          onClick={openLoginModal}
        >
          Haz login
        </MaterialButton>


        <Button variant="signup-button" size="sm" onClick={openRegisterModal}>
          Registrate
        </Button>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <NavLink to="/new-advert">
          <MaterialButton variant="filled" className="text-sm px-4 py-1.5">
            Sube un anuncio
          </MaterialButton>
        </NavLink>

        <MaterialButton
          onClick={handleLogout}
          variant="outlinedDark"
          className="text-sm px-4 py-1.5 "
        >
          Cerrar sesión
        </MaterialButton>
      </div>
    );
  }
}
