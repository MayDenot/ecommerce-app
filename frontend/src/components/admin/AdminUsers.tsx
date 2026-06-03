import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import type { User } from "../../types";
import { Trash2 } from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers]     = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<User[]>("/users")
            .then((r) => setUsers(r.data))
            .finally(() => setLoading(false));
    }, []);

    const deleteUser = async (id: number) => {
        if (!confirm("¿Seguro que querés eliminar este usuario?")) return;
        await api.delete(`/users/${id}`);
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    if (loading) return <p className="text-gray-500">Cargando usuarios...</p>;

    return (
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Usuarios registrados</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Nombre</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Rol</th>
                        <th className="px-6 py-3">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 text-gray-500">#{user.id}</td>
                            <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 text-gray-500">{user.email}</td>
                            <td className="px-6 py-4">
                                    <span className={`rounded-full px-2 py-1 text-xs font-medium
                                        ${user.role === "ADMIN"
                                        ? "bg-amber-100 text-amber-700"
                                        : "bg-gray-100 text-gray-600"}`}>
                                        {user.role}
                                    </span>
                            </td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className="text-gray-300 transition hover:text-red-500 cursor-pointer"
                                    aria-label="Eliminar usuario"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {users.length === 0 && (
                    <p className="p-6 text-center text-sm text-gray-400">No hay usuarios.</p>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;