import { NavLink } from "react-router-dom";
import MaterialButton from "../../components/MaterialButton";

import { User } from "@/services/schemas/UserSchemas";

export default function NavActions(user:{user:User}) {
  if (!user) {
    return (
        <div className="flex gap-2">

      <div>
        <NavLink to="/login">
          <MaterialButton variant="outlined" className="text-sm px-4 py-1.5">
            Haz login
          </MaterialButton>
        </NavLink>
        <NavLink to="/register">
          <MaterialButton variant="filled" className="text-sm px-4 py-1.5">
            Registrate
          </MaterialButton>
        </NavLink>
      </div>
      </div>
    );
  } else {
    return (
      <div className="flex gap-2">
        {/* LOGO + SEARCH 
            <Button variant="primary" onClick={() => navigate("/register")}>Crea tu cuenta</Button>
            <Button variant="outline" onClick={() => navigate("/Login")}>haz Login</Button>
            */}
        <NavLink to="/new-advert">
          <MaterialButton variant="filled" className="text-sm px-4 py-1.5">
            Publica un anuncio
          </MaterialButton>
        </NavLink>
      </div>
    );
  }
}
