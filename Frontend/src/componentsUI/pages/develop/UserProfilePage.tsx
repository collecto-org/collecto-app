import { useState } from "react";
import Icon from "@/componentsUI/elements/Icon";
import { Link } from "react-router-dom";
import AdvertsFavorites from "@/componentsUI/containers/develop/AdvertsFavorites";
import AdvertsPublished from "@/componentsUI/containers/develop/AdvertsPublished";
import UserProfile from "@/componentsUI/containers/develop/UserProfile";
import UpdatePassword from "@/componentsUI/containers/develop/UpdatePassword";
import DeleteAccount from "@/componentsUI/containers/develop/DeleteAccount";
import { useLocation } from "react-router-dom";

export default function UserProfilePage() {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(
    location.state?.section || "Mi Perfil"
  );

  const menuItems = [
    { icon: "user", label: "Mi Perfil" },
    { icon: "user", label: "Cambiar Contraseña" },
    { icon: "user", label: "Eliminar Cuenta" },
    { icon: "box", label: "Mis anuncios" },
    { icon: "heart", label: "Favoritos" },
    { icon: "chat", label: "Chat" },
    { icon: "heart", label: "Notificaciones" },
    { icon: "mapPin", label: "Direcciones de envío" },
    { icon: "creditCard", label: "Formas de pago" },
    { icon: "fileText", label: "Datos de facturación" },
    { icon: "list", label: "Historial de pedidos" },
    { icon: "helpCircle", label: "Preguntas frecuentes" },
  ];

  return (
    <>
      <div className="py-14 mt-10 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-darkblue mb-6">
          Gestión de Usuario
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - SOLO visible en escritorio */}
          <aside className="hidden md:block w-full md:w-1/4 border-2 border-coral bg-white rounded p-4 space-y-8 text-coral">
            {menuItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSection(item.label)}
                className={`flex items-center gap-2 hover:font-bold cursor-pointer ${
                  activeSection === item.label ? "font-black" : ""
                }`}
              >
                <Icon name={item.icon as any} size={20} />
                <span>{item.label}</span>
              </div>
            ))}
          </aside>

          {/* Dropdown - SOLO visible en móvil */}
          <div className="md:hidden w-full rounded p-2">
            <select
              value={activeSection}
              onChange={(e) => setActiveSection(e.target.value)}
              className="w-full border-2 border-coral bg-white text-coral font-bold rounded px-3 py-2"
            >
              {menuItems.map((item, idx) => (
                <option key={idx} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sección derecha dinámica */}
          <section className="w-full md:w-3/4 bg-white rounded p-2 shadow space-y-4">
            {activeSection === "Mis anuncios" && <AdvertsPublished />}
            {activeSection === "Favoritos" && <AdvertsFavorites />}
            {activeSection === "Mi Perfil" && <UserProfile />}
            {activeSection === "Cambiar Contraseña" && <UpdatePassword />}
            {activeSection === "Eliminar Cuenta" && <DeleteAccount />}
          </section>
        </div>
      </div>
    </>
  );
}
