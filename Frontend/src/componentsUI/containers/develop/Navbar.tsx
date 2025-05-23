import { useState } from "react";
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
import ModalRecoverPassword from "./ModalRecoverPassword";
import ModalConfirmEmailSent from "./ModalConfirmEmailSent";
import ModalRegister from "./ModalRegister";

interface Props {
  auth?: boolean;
}

export default function Navbar({ auth }: Props) {
  const user = useSelector((state: RootState) => selectUser(state));
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRecoverPasswordOpen, setIsRecoverPasswordOpen] = useState(false);
  const [isConfirmEmailSentOpen, setIsConfirmEmailSentOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnClick = async () => {
    dispatch(clearFilter());
    navigate("/");
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRecoverPasswordOpen(false);
    setIsConfirmEmailSentOpen(false);
  };

  const openRecoverPasswordModal = () => {
    setIsLoginModalOpen(false);
    setIsRecoverPasswordOpen(true);
    setIsConfirmEmailSentOpen(false);
  };

  const openConfirmEmailSentModal = () => {
    setIsRecoverPasswordOpen(false);
    setIsConfirmEmailSentOpen(true);
  };

  const closeAllModals = () => {
    setIsLoginModalOpen(false);
    setIsRecoverPasswordOpen(false);
    setIsConfirmEmailSentOpen(false);
  };

  return (
    <>
      {/* Modales */}
      {isLoginModalOpen && (
        <ModalLogin
          isOpen={isLoginModalOpen}
          onClose={closeAllModals}
          onRecoverPassword={openRecoverPasswordModal}
          onRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />
      )}

      {isRecoverPasswordOpen && (
        <ModalRecoverPassword
          isOpen={isRecoverPasswordOpen}
          onClose={closeAllModals}
          onSuccess={openConfirmEmailSentModal}
        />
      )}

      {isConfirmEmailSentOpen && (
        <ModalConfirmEmailSent
          isOpen={isConfirmEmailSentOpen}
          onClose={closeAllModals}
        />
      )}

      {isRegisterModalOpen && (
        <ModalRegister
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white text-darkblue shadow-md flex items-center justify-between py-2 px-4">
        {/* LOGO */}
        <div className="flex-shrink-0">
          <Logo
            src="/logos/logo-horizontal-collecto.png"
            alt="Collecto logo"
            width={150}
            height={25}
            onClick={handleOnClick}
            className="hidden lg:block"
          />
          <Logo
            src="/logos/imagotipo-min-collecto.png"
            alt="Collecto imagotipo"
            width={40}
            height={32}
            onClick={handleOnClick}
            className="block lg:hidden"
          />
        </div>

        {/* SEARCHBAR (SIEMPRE VISIBLE, CONTROL DE ANCHO) */}
        {!auth && (
          <div className="flex-1 flex justify-center px-2">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <SearchBar
                placeholder="Busca en todos los universos"
                width="w-full"
              />
            </div>
          </div>
        )}

        {/* ICONOS Y MENÚ */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {!auth && (
            <>
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <NavIcons user={user} />
                  <NavActions
                    user={user}
                    openLoginModal={openLoginModal}
                    openRegisterModal={() => setIsRegisterModalOpen(true)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <UserMenu user={user} />
                  <ShoppingCart />
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
      </nav>

      {/* CONTENIDO COLAPSADO - MÓVIL */}
      {menuOpen && (
        <div className="md:hidden px-4 space-y-4 bg-white mt-16">
          <div className="flex flex-col gap-2 items-center">
            <div className="flex flex-row gap- justify-center">
              <NavIcons user={user} />
              <UserMenu user={user} />
              <div className="pt-2">
                <ShoppingCart />
              </div>
            </div>
            <NavActions
              user={user}
              openLoginModal={openLoginModal}
              openRegisterModal={() => setIsRegisterModalOpen(true)}
            />
          </div>
        </div>
      )}
    </>
  );
}
