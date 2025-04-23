import { useState } from "react";
import Icon from "@/componentsUI/elements/Icon";
import Button from "@/componentsUI/elements/Button";
import { Link } from "react-router-dom";

export default function UserProfilePage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [activeSection, setActiveSection] = useState("Mi Perfil");

  const user = {
    avatar: "https://github.com/mdo.png",
    firstName: "Martin",
    lastName: "Rivas Reynoso",
    email: "test@hotmail.com",
    birthdate: "2000-10-10",
  };

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
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg p-4 z-50 text-sm">
              <p className="font-semibold text-darkblue mb-2">Notificaciones</p>
              <ul className="space-y-2">
                <li>✅ Tu pedido fue confirmado</li>
                <li>📦 Tu producto fue enviado</li>
                <li>🛒 Hay nuevas ofertas en tu universo</li>
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
      <div className="max-w-6xl mx-auto px-6 py-8 mt-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-coral rounded-lg p-4 space-y-8 text-white">
            {[
              { icon: "user", label: "Mi Perfil" },
              { icon: "mapPin", label: "Direcciones de envío" },
              {
                icon: "list",
                label: "Mis anuncios",
                link: "/adverts/published",
              },
              { icon: "heart", label: "Favoritos", link: "/adverts/favorites" },
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
          <section className="w-full md:w-3/4 bg-white rounded-lg p-6 shadow space-y-4">
            {activeSection === "Mi Perfil" && (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <p className="text-gray-600 text-sm">Hola</p>
                      <h2 className="text-xl font-bold text-darkblue uppercase">
                        {user.firstName}
                      </h2>
                    </div>
                  </div>
                  <Button variant="turquoise">Editar</Button>
                </div>

                <hr />

                <div className="space-y-2 text-sm text-darkblue">
                  <div className="flex items-center gap-2">
                    <Icon name="mail" size={18} />
                    <div>
                      <p className="text-sage text-xs">Correo electrónico</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="user" size={18} />
                    <div>
                      <p className="text-sage text-xs">Nombre</p>
                      <p>{user.firstName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="user" size={18} />
                    <div>
                      <p className="text-sage text-xs">Apellidos</p>
                      <p>{user.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="calendar" size={18} />
                    <div>
                      <p className="text-sage text-xs">Fecha de nacimiento</p>
                      <p>{user.birthdate}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeSection === "Mis datos" && (
              <div>
                <h2 className="text-xl font-bold text-darkblue mb-4">
                  Mis datos
                </h2>
                <p className="text-sm text-gray-600">
                  Aquí irá el formulario o la tabla para capturar y gestionar
                  tus datos.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
