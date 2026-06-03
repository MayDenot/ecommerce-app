import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import type { Order } from "../../types";
import type { OrderStatus } from "../../types";

const statusOptions: OrderStatus[] = ["PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

const statusColor: Record<string, string> = {
    PAID:      "bg-indigo-100 text-indigo-700",
    SHIPPED:   "bg-blue-100 text-blue-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    PENDING:   "bg-yellow-100 text-yellow-700",
};

const AdminOrders = () => {
    const [orders, setOrders]   = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<Order[]>("/orders")
            .then((r) => setOrders(r.data))
            .finally(() => setLoading(false));
    }, []);

    const updateStatus = async (id: number, status: OrderStatus) => {
        await api.patch(`/orders/${id}/status`, null, { params: { status } });
        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
    };

    const formatPrice = (n: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);

    if (loading) return <p className="text-gray-500">Cargando órdenes...</p>;

    return (
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Todas las órdenes</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Fecha</th>
                        <th className="px-6 py-3">Productos</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Estado</th>
                        <th className="px-6 py-3">Cambiar estado</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                #{order.id}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString("es-AR")}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                                {order.items.length} ítem{order.items.length !== 1 ? "s" : ""}
                            </td>
                            <td className="px-6 py-4 font-medium">
                                {formatPrice(order.totalPrice)}
                            </td>
                            <td className="px-6 py-4">
                                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusColor[order.status]}`}>
                                        {order.status}
                                    </span>
                            </td>
                            <td className="px-6 py-4">
                                <select
                                    value={order.status}
                                    onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                                    className="rounded-lg border border-gray-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-400 cursor-pointer"
                                >
                                    {statusOptions.map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <p className="p-6 text-center text-sm text-gray-400">No hay órdenes.</p>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;