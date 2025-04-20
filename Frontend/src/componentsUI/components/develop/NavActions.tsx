import { NavLink } from "react-router-dom";
import MaterialButton from "../../components/MaterialButton";
import { User } from "@/services/schemas/UserSchemas";

export default function NavActions({ user }: { user: User }) {
  if (!user.username) {
    return (
      <div className="flex gap-2 flex-shrink-0">
        <NavLink to="/login">
          <MaterialButton variant="outlined" className="text-sm px-4 py-1.5">
            Haz login
          </MaterialButton>
        </NavLink>
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
