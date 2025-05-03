import { useState, useEffect } from "react";
import {
  useGetUniversesQuery,
  useCreateUniverseMutation,
  useUpdateUniverseMutation,
  useDeleteUniverseMutation,
} from "@/services/universesApi";
import { UniverseSchema } from "@/services/schemas/UniverseSchemas";
import Icon from "@/componentsUI/elements/Icon";
import Button from "@/componentsUI/elements/Button";

export default function UniverseTable() {
  const { data, isLoading } = useGetUniversesQuery();
  const [universes, setUniverses] = useState<UniverseSchema[]>([]);
  const [createUniverse] = useCreateUniverseMutation();
  const [updateUniverse] = useUpdateUniverseMutation();
  const [deleteUniverse] = useDeleteUniverseMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<UniverseSchema>>({});
  const [newEntry, setNewEntry] = useState<Partial<UniverseSchema>>({
    name: "",
    logoUrl: "",
    slug: "",
  });

  useEffect(() => {
    if (data) {
      setUniverses(data);
    }
  }, [data]);

  const handleCreate = async () => {
    if (!newEntry.name || !newEntry.logoUrl || !newEntry.slug) return;
    const slugExists = universes.some((u) => u.slug === newEntry.slug);
    if (slugExists) {
      alert("Ya existe un universo con ese slug.");
      return;
    }
    await createUniverse(newEntry as UniverseSchema);
    setNewEntry({ name: "", logoUrl: "", slug: "" });
  };

  const handleDelete = async (id: string) => {
    await deleteUniverse(id);
    setUniverses((prev) => prev.filter((u) => u._id !== id));
  };

  const handleSave = async (id: string) => {
    if (!editValues.name || !editValues.slug || !editValues.logoUrl) return;
    const isDuplicate = universes.some(
      (u) => u.slug === editValues.slug && u._id !== id
    );
    if (isDuplicate) {
      alert("Ese slug ya está en uso.");
      return;
    }
    await updateUniverse({ id, data: editValues as UniverseSchema });
    setEditingId(null);
    setEditValues({});
  };

  return (
    <div className="space-y-6">
      <table className="w-full table-auto border border-collapse text-sm">
        <thead className="bg-lightgrey text-darkblue font-semibold">
          <tr>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Slug</th>
            <th className="p-2 border">LogoURL</th>
            <th className="p-2 border">Logo</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[...universes].map((u) => {
            const isEditing = editingId === u._id;
            return (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="border px-2">
                  <input
                    className="w-full bg-transparent border-none outline-none"
                    value={isEditing ? editValues.name ?? "" : u.name}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, name: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2">
                  <input
                    className="w-full bg-transparent border-none outline-none"
                    value={isEditing ? editValues.slug ?? "" : u.slug}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, slug: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2">
                  <input
                    className="w-full bg-transparent border-none outline-none"
                    value={isEditing ? editValues.logoUrl ?? "" : u.logoUrl}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, logoUrl: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2 text-center">
                  <img
                    src={u.logoUrl}
                    alt={u.name}
                    className="h-8 max-w-[80px] object-contain inline-block"
                    title={u.logoUrl}
                  />
                </td>
                <td className="border px-2 flex gap-2 justify-center py-2">
                  {isEditing ? (
                    <Icon
                      name="Save"
                      className="text-coral cursor-pointer"
                      onClick={() => handleSave(u._id)}
                    />
                  ) : (
                    <Icon
                      name="Edit"
                      className="text-coral cursor-pointer"
                      onClick={() => {
                        setEditValues({
                          name: u.name,
                          slug: u.slug,
                          logoUrl: u.logoUrl,
                        });
                        setEditingId(u._id);
                      }}
                    />
                  )}
                  <Icon
                    name="Trash"
                    className="text-coral cursor-pointer"
                    onClick={() => handleDelete(u._id)}
                  />
                </td>
              </tr>
            );
          })}

          {/* Fila para agregar nuevo */}
          <tr className="bg-hospitalgreen/10">
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.name}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, name: e.target.value })
                }
                placeholder="Nuevo nombre"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.slug}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, slug: e.target.value })
                }
                placeholder="nuevo-slug"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.logoUrl}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, logoUrl: e.target.value })
                }
                placeholder="URL del logo"
              />
            </td>
            <td className="border px-2 text-center">
              {newEntry.logoUrl && (
                <img
                  src={newEntry.logoUrl}
                  alt="preview"
                  className="h-8 max-w-[80px] object-contain mx-auto"
                />
              )}
            </td>
            <td className="border px-2 text-center">
              <Button variant="turquoise" size="xs" onClick={handleCreate}>
                Agregar
              </Button>
            </td>
          </tr>
        </tbody>
      </table>

      {isLoading && (
        <p className="text-sm text-gray-500">Cargando universos...</p>
      )}
    </div>
  );
}
