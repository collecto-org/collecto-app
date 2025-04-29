import { NavLink } from "react-router-dom";
import MaterialButton from "../../components/MaterialButton";
import { User } from "@/services/schemas/UserSchemas";
import Button from "@/componentsUI/elements/Button";

interface NavActionsprops {
  user: User;
  openLoginModal: () => void;
}

export default function NavActions({ user, openLoginModal }: NavActionsprops) {
  if (!user.username) {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <Button variant="outline" size="sm" onClick={openLoginModal}>
          Haz login
        </Button>

        <NavLink to="/register">
          <MaterialButton variant="filled" className="text-sm px-4 py-1.5">
            Regístrate
          </MaterialButton>
        </NavLink>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <NavLink to="/new-advert">
          <MaterialButton variant="filled" className="text-sm px-4 py-1.5">
            Publica un anuncio
          </MaterialButton>
        </NavLink>
      </div>
    );
  }
}
