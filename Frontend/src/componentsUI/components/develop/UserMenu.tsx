import { useState } from "react";
import Dropdown from "./Dropdown";
import Logo from "../../elements/Logo";
import { User } from "@/services/schemas/UserSchemas";
import { useLogoutMutation } from "@/services/authApi";
import { useNavigate } from "react-router-dom";

export default function UserMenu(user: { user: User }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/")
      window.location.reload();
    } catch (error) {
      alert("Hubo un problema al cerrar sesión, por favor intenta de nuevo.");
    }
  };

  if (!user.user.username) return null;

  return (
    <div className="px-2">
      <Dropdown
        onToggle={() => setIsMenuOpen((prev) => !prev)}
        label={
          <div className="flex items-center gap-1 bg-white focus:outline-none">
            <div className="w-9 h-9 rounded-full overflow-hidden">
              <Logo
                src={user.user.avatarUrl || "https://github.com/mdo.png"}
                alt={user.user.username}
                width={36}
                height={36}
                rounded
              />
            </div>
            <svg
              className={`w-6 h-6 text-darkblue transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        }
      >
        <Dropdown.Item onClick={() => navigate("/userprofile")}>
          Mi perfil
        </Dropdown.Item>

        <Dropdown.Item onClick={() => navigate("/catalogmanager")}>
          Administrar catálogos
        </Dropdown.Item>

        <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
      </Dropdown>
    </div>
  );
}
