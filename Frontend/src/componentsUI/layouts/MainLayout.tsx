import { ReactNode, useEffect, useState } from "react";
import Navbar from "@/componentsUI/containers/develop/Navbar";
import Footer from "@/componentsUI/containers/develop/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import ModalLogin from "../containers/develop/ModalLogin";
import ModalRecoverPassword from "../containers/develop/ModalRecoverPassword";
import ModalConfirmEmailSent from "../containers/develop/ModalConfirmEmailSent";
import ModalRegister from "../containers/develop/ModalRegister";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/userSelectors";

type Props = {
  children: ReactNode;
  auth?: boolean;
};

export default function MainLayout({ children, auth }: Props) {
  const user = useSelector(selectUser);
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRecoverPasswordOpen, setIsRecoverPasswordOpen] = useState(false);
  const [isConfirmEmailSentOpen, setIsConfirmEmailSentOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

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
    if (!user?.username) {
      navigate("/");
    }

    window.history.replaceState({}, "", location.pathname + location.search);
    setIsLoginModalOpen(false);
    setIsLoginModalOpen(false);
    setIsRecoverPasswordOpen(false);
    setIsConfirmEmailSentOpen(false);
  };

  useEffect(() => {
    if (location.state?.showLoginModal) {
      setIsLoginModalOpen(true);
    }
  }, [location.state]);
  useEffect(() => {
    if (user.username) {
      closeAllModals();
    }
  });

  return (
    <>
      {isLoginModalOpen && (
        <ModalLogin
          isOpen={isLoginModalOpen}
          returnPath={location.state?.from?.pathname || "/"}
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

      <div className="flex flex-col min-h-screen">
        <Navbar auth={auth} />
        <main className="flex-1 bg-background text-darkblue">{children}</main>
        <Footer />
      </div>
    </>
  );
}
