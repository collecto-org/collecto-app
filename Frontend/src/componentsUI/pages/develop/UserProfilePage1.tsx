import MainLayout from "@/componentsUI/layouts/develop/MainLayout";
import FiltersSidebar from "@/componentsUI/containers/develop/SidebarMenu";

const sidebarOptions = [
  "Mi perfil",
  "Direcciones de envío",
  "Favoritos",
  "Formas de pago",
  "Datos de facturación",
  "Historial de pedidos",
  "Preguntas frecuentes",
  "Cerrar sesión",
];

// Simulación de datos del usuario (luego se reemplaza con Redux o props)
const user = {
  username: "Martin",
  email: "martin.rivas.r@hotmail.com",
  name: "MARTIN",
  surname: "RIVAS REYNOSO",
  birthdate: "18/07/1977",
};

export default function UserProfilePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <FiltersSidebar title="Menú" options={sidebarOptions} />
        </div>

        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              
              <div>
                <p className="text-sm text-gray-500">Hola</p>
                <h1 className="text-2xl font-bold text-darkblue">{user.username.toUpperCase()}</h1>
              </div>
            </div>
            <button className="bg-coral text-white px-4 py-2 rounded-xl font-semibold hover:bg-opacity-90 transition">
              Editar
            </button>
          </div>

          <div className="space-y-4 text-sm text-darkblue">
            <InfoField icon="📧" label="Correo electrónico" value={user.email} />
            <InfoField icon="👤" label="Nombre" value={user.name} />
            <InfoField icon="🧾" label="Apellidos" value={user.surname} />
            <InfoField icon="📅" label="Fecha de nacimiento" value={user.birthdate} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Subcomponente para los campos de info
function InfoField({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b py-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
