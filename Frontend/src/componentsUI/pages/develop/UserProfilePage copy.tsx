import React from "react";
import MainLayout from "@/componentsUI/layouts/develop/MainLayout";
import Icon from "@/componentsUI/elements/Icon";
import Button from "@/componentsUI/elements/Button";

export default function UserProfilePage() {
  const user = {
    avatar: "https://github.com/mdo.png",
    firstName: "Martin",
    lastName: "Rivas Reynoso",
    email: "martin.rivas.r@hotmail.com",
    birthdate: "1977-07-18",
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-lightgray rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-2 font-semibold text-darkblue">
              <Icon name="user" size={20} />
              <span>Mi Perfil</span>
            </div>
            <div className="flex items-center gap-2 text-darkblue">
              <Icon name="mapPin" size={20} />
              <span>Direcciones de envío</span>
            </div>
            <div className="flex items-center gap-2 text-darkblue">
              <Icon name="heart" size={20} />
              <span>Favoritos</span>
            </div>
            <div className="flex items-center gap-2 text-darkblue">
              <Icon name="creditCard" size={20} />
              <span>Formas de pago</span>
            </div>
            <div className="flex items-center gap-2 text-darkblue">
              <Icon name="fileText" size={20} />
              <span>Datos de facturación</span>
            </div>
            <div className="flex items-center gap-2 text-darkblue">
              <Icon name="list" size={20} />
              <span>Historial de pedidos</span>
            </div>
            <div className="flex items-center gap-2 text-darkblue">
              <Icon name="helpCircle" size={20} />
              <span>Preguntas frecuentes</span>
            </div>
          </aside>

          {/* Profile Info */}
          <section className="w-full md:w-3/4 bg-white rounded-lg p-6 shadow space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <p className="text-gray-600 text-sm">Hola</p>
                  <h2 className="text-xl font-bold text-darkblue uppercase">{user.firstName}</h2>
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
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
