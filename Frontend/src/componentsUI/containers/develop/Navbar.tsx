import React, { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Logo from "../../elements/Logo";
import SearchBar from "../../components/develop/SearchBar";
import UserMenu from "../../components/develop/UserMenu";
import NavActions from "../../components/develop/NavActions";
import NavIcons from "../../components/develop/NavIcons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectUser } from "@/store/selectors/userSelectors";
import { clearFilter } from "@/store/slices/advertsSlice";
import { useNavigate } from "react-router-dom";
import ModalLogin from "./ModalLogin";

interface Props {
  auth?: boolean;
}

export default function Navbar({ auth }: Props) {
  const user = useSelector((state: RootState) => selectUser(state));
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = async () => {
    dispatch(clearFilter());
    navigate("/");
  };

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-darkblue shadow-md flex justify-between items-center py-2 px-4">
      {/* IZQUIERDA - LOGO */}
      <div className="flex items-start flex-shrink-0">
        <Logo
          src="/logos/logo-horizontal-collecto.png"
          alt="Collecto logo"
          width={150}
          height={25}
          onClick={handleOnClick}
          className="hidden md:block"
        />
        <Logo
          src="/logos/imagotipo-min-collecto.png"
          alt="Collecto imagotipo"
          width={40}
          height={32}
          onClick={handleOnClick}
          className="block md:hidden"
        />
      </div>

      {/* DERECHA - SEARCH + ICONOS */}

      <div className="flex items-center gap-2 flex-grow justify-end px-6">
        {/* SEARCHBAR solo en md+ */}
        {!auth && (
          <>
            <div className="hidden md:flex flex-grow max-w-xl">
              <SearchBar
                placeholder="Busca en todos los universos"
                width="w-full"
              />
            </div>

            {/* ACCIONES */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <NavIcons user={user} />
                <NavActions user={user} openLoginModal={openLoginModal} />
              </div>

              <div className="flex items-center space-x-2">
                <UserMenu user={user} />
                <ShoppingCart user={user} />
              </div>
            </div>
          </>
        )}

        {/* MENÚ MÓVIL */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-darkblue"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* CONTENIDO COLAPSADO - MÓVIL */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 bg-white shadow-inner">
          <SearchBar placeholder="Buscar..." width="w-full" />
          <div className="flex flex-col gap-3">
            <NavIcons user={user} />
            <NavActions user={user}  openLoginModal={openLoginModal}/>
            <UserMenu user={user} />
            <ShoppingCart />
          </div>
        </div>
      )}
          {/* Modal de Login */}
    <ModalLogin isOpen={isLoginModalOpen} onClose={closeLoginModal}/>
    </nav>
  );
}
