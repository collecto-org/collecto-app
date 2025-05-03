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

  return (
    <>
      
      {/* Página principal */}
      <div className="py-16 mt-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-coral rounded p-4 space-y-8 text-white">
            {[
              { icon: "user", label: "Mi Perfil" ,link:""},
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
            ].map((item, idx) =>
              item.link ? (
                <Link
                  key={idx}
                  to={item.link}
                  className={`flex items-center gap-2 hover:underline cursor-pointer ${
                    activeSection === item.label ? "font-bold underline" : ""
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div
                  key={idx}
                  onClick={() => setActiveSection(item.label)}
                  className={`flex items-center gap-2 hover:underline cursor-pointer ${
                    activeSection === item.label ? "font-bold underline" : ""
                  }`}
                >
                  <Icon name={item.icon as any} size={20} />
                  <span>{item.label}</span>
                </div>
              )
            )}
          </aside>

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
