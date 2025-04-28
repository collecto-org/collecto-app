import { useState } from "react";
import Icon from "@/componentsUI/elements/Icon";
import { Link } from "react-router-dom";
import AdvertsFavorites from "@/componentsUI/containers/develop/AdvertsFavorites";
import AdvertsPublished from "@/componentsUI/containers/develop/AdvertsPublished";
import UserProfile         from "@/componentsUI/containers/develop/UserProfile";
import { selectLastNotifications} from "@/store/selectors/notificationSelector";
import { useSelector } from "react-redux";


export default function UserProfilePage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState("Mi Perfil");
  const notifications = useSelector(selectLastNotifications);

  return (
    <>
      {/* Notificaciones y Chat - flotantes */}
      <div className="mt-10 absolute top-4 right-4 flex gap-4 z-50">
        <div className="relative">
          <Icon
            name="bell"
            className="text-darkblue hover:text-coral cursor-pointer"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowChat(false);
            }}
          />
          {showNotifications && notifications && notifications.length > 0 &&(
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-50 text-sm">
              <p className="font-semibold text-darkblue mb-2">Notificaciones</p>
              <ul className="space-y-2">
                {notifications.map((notification) => (
            <li key={notification._id}>{notification.message}</li>
        ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <Icon
            name="chat"
            className="text-darkblue hover:text-coral cursor-pointer"
            onClick={() => {
              setShowChat(!showChat);
              setShowNotifications(false);
            }}
          />
          {showChat && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-50 text-sm">
              <p className="font-semibold text-darkblue mb-2">Mensajes</p>
              <ul className="space-y-2">
                <li>🧑‍🚀 "Hola, ¿sigue disponible?"</li>
                <li>👽 "¿Aceptas intercambios?"</li>
                <li>🤖 "Gracias por la compra"</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Página principal */}
      <div className="py-16 mt-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-coral rounded p-4 space-y-8 text-white">
            {[
              { icon: "user", label: "Mi Perfil" },
              { icon: "user", label: "Cambiar Contraseña" },
              { icon: "user", label: "Eliminar Cuenta" },
              { icon: "box",label: "Mis anuncios",},
              { icon: "heart", label: "Favoritos" }, 
              { icon: "mapPin", label: "Direcciones de envío" },
              { icon: "creditCard", label: "Formas de pago" },
              { icon: "fileText", label: "Datos de facturación" },
              { icon: "list", label: "Historial de pedidos" },
              { icon: "helpCircle", label: "Preguntas frecuentes" },
              { icon: "database", label: "Mis datos" },
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
          </section>
        </div>
      </div>
    </>
  );
}
