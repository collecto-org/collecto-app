import React, { useState } from "react";
import Logo from "../../elements/Logo";
import SearchBar from "../../components/develop/SearchBar";
import LanguajeSelector from "../../components/develop/LanguajeSelector";
import UserMenu from "../../components/develop/UserMenu";
import NavActions from "../../components/develop/NavActions";
import NavIcons from "../../components/develop/NavIcons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const user = useSelector((state: RootState) => selectUser(state));

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-darkblue shadow-md flex justify-between items-center py-0 px-4">
      <div className="flex items-end p-2">
        <Logo
          src="/logos/logo-horizontal-collecto.png"
          alt="Collecto logo"
          width={150}
          height={25}
          redirectTo="/"
        />
      </div>
      <div className="flex-1 max-w-lg">
        <SearchBar

          placeholder="Busca en todos los universos"
          value={query}
          onChange={setQuery}
          onSearch={() => console.log("Buscar en navbar:", query)}
          width="w-full"
        />
      </div>
      <div className="flex items-center">
        <NavIcons user={user} />
        <NavActions user={user} />
        <UserMenu user={user} />
        <LanguajeSelector />
      </div>
    </nav>
  );
}

// <div className="border border-black ">
