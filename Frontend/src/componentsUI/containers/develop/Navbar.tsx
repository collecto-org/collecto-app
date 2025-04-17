import React from "react";
import Logo from "../../elements/Logo";
import SearchBar from "../../components/develop/SearchBar";
import LanguajeSelector from "../../components/develop/LanguajeSelector";
import UserMenu from "../../components/develop/UserMenu";
import NavActions from "../../components/develop/NavActions";
import NavIcons from "../../components/develop/NavIcons"

export default function Navbar() {
  return (
    <nav className="flex justify-between bg-cream text-darkblue shadow-md items-center  z-10 top-0 w-full py-2 px-1">
      
        <div className="flex items-center p-2">
          <Logo src="/logos/logo-horizontal-collecto.png" alt="Collecto logo" size={150} />
        </div>
        <div className="flex-1 max-w-lg">
          <SearchBar/>
        </div>
        <div className="flex items-center">
          <NavIcons/>
          <NavActions/>
          <UserMenu/>
          <LanguajeSelector/>
        </div>
      
    </nav>

  );
}

// <div className="border border-black ">