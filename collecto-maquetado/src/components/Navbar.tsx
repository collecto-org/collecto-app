import { NavLink } from "react-router-dom";
import MaterialButton from "@/components/MaterialButton";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-cream w-full border-b border-gray-300 shadow-sm backdrop-blur">
      <div
        className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-6
      "
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* LOGO + SEARCH */}
          <div className="flex items-center w-full gap-4">
            <img
              src="/logos/logo-horizontal-collecto.png"
              alt="Logo"
              className="h-10"
            />

            <div className="relative w-full max-w-sm">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-darkblue/60 pointer-events-none" />
              <input
                type="text"
                placeholder="Busca en todos los universos"
                className="w-full rounded-full bg-gray-300 text-darkblue pl-10 pr-4 py-3
                 text-sm placeholder:text-darkblue/60 focus:outline-none"
              />
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-3 shrink-0">
            <NavLink to="/register">
              <MaterialButton variant="filled" className="text-sm px-4 py-1.5">
                Crea tu cuenta
              </MaterialButton>
            </NavLink>
            <NavLink to="/login">
              <MaterialButton
                variant="outlined"
                className="text-sm px-4 py-1.5"
              >
                Haz login
              </MaterialButton>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}
