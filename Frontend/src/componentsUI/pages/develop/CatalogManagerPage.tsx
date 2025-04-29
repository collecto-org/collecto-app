import { useState } from "react";
import UniverseTable from "@/componentsUI/tables/UniverseTable"
import UserTable from "@/componentsUI/tables/UserTable";


export default function CatalogManagerPage() {
  const [activeTable, setActiveTable] = useState("Categorías");
  

  const tableList = [
    "Categorías",
    "Universos",
    "Usuarios",
    "Métodos de pago",
    "Marcas",
    "Proveedores",
    "Estados",
    "Códigos postales",
  ];

  return (
    <>
      <div className="w-full px-6 py-20">
        <h1 className="text-2xl font-bold text-darkblue mb-6">Gestión de catálogos</h1>

        <div className="flex gap-6">
          {/* Sidebar con lista de tablas */}
          <aside className="w-64 bg-coral rounded-lg p-4 text-white space-y-4">
            {tableList.map((table) => (
              <div
                key={table}
                onClick={() => setActiveTable(table)}
                className={`cursor-pointer hover:underline ${
                  activeTable === table ? "font-bold underline" : ""
                }`}
              >
                {table}
              </div>
            ))}
          </aside>

          {/* Área de contenido */}
          <section className="flex-1 bg-white rounded-lg p-6 shadow min-w-0 overflow-x-auto">
            <h2 className="text-xl font-semibold text-darkblue mb-4">{activeTable}</h2>

            {activeTable === "Universos" && <UniverseTable />}
            {activeTable === "Usuarios" && <UserTable />}

            {/* Si quieres dejar el placeholder por defecto para otras tablas aún no implementadas 
            {activeTable !== "Universos" && (
              <p className="text-sm text-gray-600">
                Aquí se mostrará la tabla editable para <strong>{activeTable}</strong>.
              </p>
            )}*/}
          </section>
        </div>
      </div>
    </>
  );
}
