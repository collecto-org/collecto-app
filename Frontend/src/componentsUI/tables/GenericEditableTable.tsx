import React, { useState, useEffect } from "react";
import Button from "@/componentsUI/elements/Button";
import Icon from "@/componentsUI/elements/Icon";

type Column<T> = {
  key: keyof T;
  label: string;
};

type GenericEditableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onCreate: (newEntry: Partial<T>) => void;
  onUpdate: (id: string, updated: Partial<T>) => void;
  onDelete: (id: string) => void;
  renderPreview?: (row: T) => React.ReactElement;
};

export default function GenericEditableTable<T extends { _id: string }>({
  data,
  columns,
  onCreate,
  onUpdate,
  onDelete,
  renderPreview,
}: GenericEditableTableProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<T>>({});
  const [newEntry, setNewEntry] = useState<Partial<T>>({});

  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleChange = (
    key: keyof T,
    value: string,
    isNew: boolean,
    id?: string
  ) => {
    if (isNew) {
      setNewEntry((prev) => ({ ...prev, [key]: value }));
    } else {
      setEditValues((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSave = () => {
    if (!editValues || !editingId) return;
    onUpdate(editingId, editValues);
    setEditingId(null);
    setEditValues({});
  };

  const handleCreate = () => {
    onCreate(newEntry);
    setNewEntry({});
  };

  return (
    <div className="space-y-6">
      <table className="w-full table-auto border border-collapse text-sm">
        <thead className="bg-lightgrey text-darkblue font-semibold">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="p-2 border">
                {col.label}
              </th>
            ))}
            {renderPreview && <th className="p-2 border">Preview</th>}
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isEditing = editingId === row._id;
            return (
              <tr key={row._id} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.key)} className="border px-2">
                    <input
                      className="w-full bg-transparent border-none outline-none"
                      value={
                        isEditing
                          ? (editValues[col.key] as string) ??
                            (row[col.key] as string)
                          : (row[col.key] as string)
                      }
                      disabled={!isEditing}
                      onChange={(e) =>
                        handleChange(col.key, e.target.value, false, row._id)
                      }
                    />
                  </td>
                ))}

                {renderPreview && (
                  <td className="border px-2 text-center">
                    {renderPreview(row)}
                  </td>
                )}

                <td className="border px-2 flex gap-2 justify-center py-2">
                  {isEditing ? (
                    <Icon
                      name="Save"
                      className="text-coral cursor-pointer"
                      onClick={handleSave}
                    />
                  ) : (
                    <Icon
                      name="Edit"
                      className="text-coral cursor-pointer"
                      onClick={() => {
                        setEditingId(row._id);
                        setEditValues(row);
                      }}
                    />
                  )}
                  <Icon
                    name="Trash"
                    className="text-coral cursor-pointer"
                    onClick={() => onDelete(row._id)}
                  />
                </td>
              </tr>
            );
          })}

          {/* Fila para nuevo */}
          <tr className="bg-hospitalgreen/10">
            {columns.map((col) => (
              <td key={String(col.key)} className="border px-2">
                <input
                  className="w-full bg-transparent border-none outline-none"
                  value={(newEntry[col.key] as string) || ""}
                  onChange={(e) => handleChange(col.key, e.target.value, true)}
                  placeholder={`Nuevo ${col.label.toLowerCase()}`}
                />
              </td>
            ))}

            {renderPreview && (
              <td className="border px-2 text-center">
                {(newEntry as any).logoUrl && (
                  <img
                    src={(newEntry as any).logoUrl}
                    className="h-8 max-w-[80px] object-contain mx-auto"
                  />
                )}
              </td>
            )}

            <td className="border px-2 text-center">
              <Button variant="turquoise" size="xs" onClick={handleCreate}>
                Agregar
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export type { Column };
