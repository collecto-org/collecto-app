import { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "@/services/Tables/usersApi";
import { UserSchema } from "@/services/schemas/UserSchemas";
import Icon from "@/componentsUI/elements/Icon";
import Button from "@/componentsUI/elements/Button";
import { useGetGendersQuery } from "@/services/gendersApi";

export default function UserTable() {
  const { data, isLoading } = useGetUsersQuery();
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const { data: genders = [], isLoading: loadingGenders } =
    useGetGendersQuery();
  const [editValues, setEditValues] = useState<Partial<UserSchema>>({});

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEntry, setNewEntry] = useState<
    Partial<UserSchema & { password: string }>
  >({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
    avatarUrl: "",
    dateOfBirth: undefined,
    gender: "",
    bio: "",
    role: "user",
    emailVerified: false,
  });

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const handleCreate = async () => {
    if (!newEntry.username || !newEntry.email || !newEntry.password) {
      alert("Debe completar username, email y password");
      return;
    }
    await createUser(newEntry as any);
    setNewEntry({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      location: "",
      avatarUrl: "",
      dateOfBirth: undefined,
      gender: "",
      bio: "",
      role: "user",
      emailVerified: false,
    });
  };

  const handleSave = async (id: string) => {
    if (!editValues.username || !editValues.email) return;
    await updateUser({ id, data: editValues as any });
    setEditingId(null);
    setEditValues({});
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  return (
    <div className="space-y-6">
      <table className="w-full table-auto border border-collapse text-xs">
        <thead className="bg-lightgrey text-darkblue font-semibold">
          <tr>
            <th className="p-2 border min-w-[120px]">Avatar</th>
            <th className="p-2 border min-w-[100px]">Username</th>
            <th className="p-2 border min-w-[250px]">Email</th>
            <th className="p-2 border min-w-[100px]">First Name</th>
            <th className="p-2 border min-w-[100px]">Last Name</th>
            <th className="p-2 border min-w-[100px]">Phone</th>
            <th className="p-2 border min-w-[120px]">Location</th>
            <th className="p-2 border min-w-[120px]">Fecha Nacimiento</th>
            <th className="p-2 border min-w-[120px]">Genero</th>
            <th className="p-2 border min-w-[500px]">Avatar URL</th>
            <th className="p-2 border min-w-[300px]">Biografía</th>
            <th className="p-2 border min-w-[70px]">Role</th>
            <th className="p-2 border min-w-[20px]">Email Verified</th>
            <th className="p-2 border min-w-[50px]">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {[...users].map((u) => {
            const isEditing = editingId === u._id;
            return (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="border px-2 text-center min-w-[65px]">
                  <img
                    src={u.avatarUrl || "/assets/default-avatar-mas.jpg"}
                    alt={u.username}
                    className="h-8 w-8 rounded-full object-cover mx-auto"
                  />
                </td>
                <td className="border px-2 min-w-[120px]">
                  <input
                    className="w-full min-w-[100px] bg-transparent border-none outline-none"
                    value={isEditing ? editValues.username ?? "" : u.username}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, username: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2 min-w-[200px]">
                  <input
                    className="w-full min-w-[200px] bg-transparent border-none outline-none"
                    value={isEditing ? editValues.email ?? "" : u.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, email: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2 min-w-[100px]">
                  <input
                    className="w-full min-w-[100px] bg-transparent border-none outline-none"
                    value={isEditing ? editValues.firstName ?? "" : u.firstName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        firstName: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="border px-2 min-w-[80px]">
                  <input
                    className="w-full min-w-[80px] bg-transparent border-none outline-none"
                    value={isEditing ? editValues.lastName ?? "" : u.lastName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, lastName: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2 min-w-[80px]">
                  <input
                    className="w-full min-w-[80px] bg-transparent border-none outline-none"
                    value={isEditing ? editValues.phone ?? "" : u.phone || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, phone: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2 min-w-[100px]">
                  <input
                    className="w-full min-w-[100px] bg-transparent border-none outline-none"
                    value={
                      isEditing ? editValues.location ?? "" : u.location || ""
                    }
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, location: e.target.value })
                    }
                  />
                </td>
                <td className="border px-2 min-w-[100px]">
                  <input
                    className="w-full min-w-[100px] bg-transparent border-none outline-none"
                    value={
                      isEditing
                        ? editValues.dateOfBirth ?? ""
                        : u.dateOfBirth || ""
                    }
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        dateOfBirth: e.target.value,
                      })
                    }
                  />
                </td>

                <td className="min-w-[120px] w-full">
                  {isEditing ? (
                    <select
                      className="w-full border-none bg-transparent outline-none"
                      value={editValues.gender || ""}
                      onChange={(e) =>
                        setEditValues({ ...editValues, gender: e.target.value })
                      }
                    >
                      <option value="">Seleccione género</option>
                      {genders.map((gender) => (
                        <option key={gender._id} value={gender._id}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>
                      {genders.find((g) => g._id === u.gender)?.label || ""}
                    </p>
                  )}
                </td>

                <td className="border px-2 min-w-[100px]">
                  <input
                    className="w-full min-w-[100px] bg-transparent border-none outline-none"
                    value={
                      isEditing ? editValues.avatarUrl ?? "" : u.avatarUrl || ""
                    }
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({
                        ...editValues,
                        avatarUrl: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="border px-2 min-w-[100px]">
                  <input
                    className="w-full min-w-[100px] bg-transparent border-none outline-none"
                    value={isEditing ? editValues.bio ?? "" : u.bio || ""}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setEditValues({ ...editValues, bio: e.target.value })
                    }
                  />
                </td>

                <td className="border px-2 min-w-[50px]">
                  {isEditing ? (
                    <select
                      className="w-full min-w-[50px] bg-transparent border-none outline-none"
                      value={editValues.role ?? u.role}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          role: e.target.value as "user" | "admin",
                        })
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span>{u.role}</span>
                  )}
                </td>
                <td className="border px-2 text-center">
                  {isEditing ? (
                    <input
                      type="checkbox"
                      checked={editValues.emailVerified ?? u.emailVerified}
                      onChange={(e) =>
                        setEditValues({
                          ...editValues,
                          emailVerified: e.target.checked,
                        })
                      }
                    />
                  ) : (
                    <input type="checkbox" checked={u.emailVerified} disabled />
                  )}
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
                        setEditValues(u);
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

          {/* Fila para crear nuevo usuario */}
          <tr className="bg-hospitalgreen/10">
            <td className="border px-2 text-center">
              {newEntry.avatarUrl && (
                <img
                  src={newEntry.avatarUrl}
                  alt="preview"
                  className="h-8 w-8 rounded-full mx-auto object-cover"
                />
              )}
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.username || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, username: e.target.value })
                }
                placeholder="username"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.email || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, email: e.target.value })
                }
                placeholder="email"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.firstName || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, firstName: e.target.value })
                }
                placeholder="first name"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.lastName || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, lastName: e.target.value })
                }
                placeholder="last name"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.phone || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, phone: e.target.value })
                }
                placeholder="phone"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.location || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, location: e.target.value })
                }
                placeholder="location"
              />
            </td>
            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.phone || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, dateOfBirth: e.target.value })
                }
                placeholder="Fecha de nacimiento"
              />
            </td>
            <td className="min-w-[120px] w-full">
              <select
                className="w-full border-none bg-transparent outline-none"
                value={newEntry.gender || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, gender: e.target.value })
                }
              >
                <option value="">Seleccione género</option>
                {genders.map((gender) => (
                  <option key={gender._id} value={gender._id}>
                    {gender.label}
                  </option>
                ))}
              </select>
            </td>

            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.phone || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, avatarUrl: e.target.value })
                }
                placeholder="Avatar URL"
              />
            </td>

            <td className="border px-2">
              <input
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.phone || ""}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, bio: e.target.value })
                }
                placeholder="Biografía"
              />
            </td>

            <td className="border px-2">
              <select
                className="w-full bg-transparent border-none outline-none"
                value={newEntry.role || "user"}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    role: e.target.value as "user" | "admin",
                  })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td className="border px-2 text-center">
              <input
                type="checkbox"
                checked={newEntry.emailVerified || false}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, emailVerified: e.target.checked })
                }
              />
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
        <p className="text-sm text-gray-500">Cargando usuarios...</p>
      )}
    </div>
  );
}
