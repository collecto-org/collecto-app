import { useState } from "react";
import UniverseTable from "@/componentsUI/tables/UniverseTable";
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
      <div className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-darkblue mb-6">
          Gestión de Catálogos
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar - solo escritorio */}
          <aside className="hidden md:block w-full md:w-1/4 border-2 border-coral bg-white rounded p-4 space-y-4 text-coral">
            {tableList.map((table) => (
              <div
                key={table}
                onClick={() => setActiveTable(table)}
                className={`cursor-pointer hover:font-bold ${
                  activeTable === table ? "font-black" : ""
                }`}
              >
                {table}
              </div>
            ))}
          </aside>

          {/* Dropdown - solo móvil */}
          <div className="md:hidden w-full rounded p-2">
            <select
              value={activeTable}
              onChange={(e) => setActiveTable(e.target.value)}
              className="w-full border-2 border-coral bg-white text-coral font-bold rounded px-3 py-2"
            >
              {tableList.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
          </div>

          {/* Área de contenido con scroll horizontal */}
          <section className="w-full md:w-3/4 bg-white rounded p-6 shadow space-y-4 overflow-x-auto">
            <h2 className="text-xl font-semibold text-darkblue mb-4">
              {activeTable}
            </h2>

            {activeTable === "Universos" && <UniverseTable />}
            {activeTable === "Usuarios" && <UserTable />}

            {/* Aquí puedes añadir placeholders o más tablas según lo necesites */}
          </section>
        </div>
      </div>
    </>
  );
}
