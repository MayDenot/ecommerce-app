import { useEffect, useState } from "react";
import { ShoppingBag, Users, Package, TrendingUp } from "lucide-react";
import api from "../../api/axiosConfig";
import type {Order, PageResponse, Product, User} from "../../types";

const AdminStats = () => {
    const [orders, setOrders]     = useState<Order[]>([]);
    const [users, setUsers]       = useState<User[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get<Order[]>("/orders").then((r) => setOrders(r.data));
        api.get<User[]>("/users").then((r) => setUsers(r.data));
        api.get<PageResponse<Product>>("/products")
            .then((r) => setProducts(r.data.content));
    }, []);

    const totalRevenue = orders
        .filter((o) => o.status !== "CANCELLED")
        .reduce((acc, o) => acc + o.totalPrice, 0);

    const lowStock = products.filter((p) => p.stock <= 5);

    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const formatPrice = (n: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);

    const stats = [
        { label: "Ingresos totales", value: formatPrice(totalRevenue), icon: <TrendingUp size={22} />, color: "text-green-600 bg-green-100" },
        { label: "Órdenes totales",  value: orders.length,             icon: <ShoppingBag size={22} />, color: "text-indigo-600 bg-indigo-100" },
        { label: "Usuarios",         value: users.length,              icon: <Users size={22} />,       color: "text-blue-600 bg-blue-100" },
        { label: "Productos",        value: products.length,           icon: <Package size={22} />,     color: "text-purple-600 bg-purple-100" },
    ];

    return (
        <div className="space-y-6">
            {/* Métricas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl bg-white p-6 shadow-sm">
                        <div className={`mb-3 inline-flex rounded-xl p-2 ${s.color}`}>
                            {s.icon}
                        </div>
                        <p className="text-sm text-gray-500">{s.label}</p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">{s.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Órdenes recientes */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 font-semibold text-gray-900">Órdenes recientes</h2>
                    <div className="space-y-3">
                        {recentOrders.map((o) => (
                            <div key={o.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Orden #{o.id}</span>
                                <span className="font-medium">{formatPrice(o.totalPrice)}</span>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-medium
                                    ${o.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                                    o.status === "SHIPPED"   ? "bg-blue-100 text-blue-700" :
                                        o.status === "PAID"      ? "bg-indigo-100 text-indigo-700" :
                                            o.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-700"}`}>
                                    {o.status}
                                </span>
                            </div>
                        ))}
                        {recentOrders.length === 0 && (
                            <p className="text-sm text-gray-400">Sin órdenes aún.</p>
                        )}
                    </div>
                </div>

                {/* Productos con poco stock */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <h2 className="mb-4 font-semibold text-gray-900">
                        Stock bajo{" "}
                        <span className="ml-1 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-600">
                            ≤ 5 unidades
                        </span>
                    </h2>
                    <div className="space-y-3">
                        {lowStock.map((p) => (
                            <div key={p.id} className="flex items-center justify-between text-sm">
                                <span className="truncate text-gray-700">{p.name}</span>
                                <span className={`font-semibold ${p.stock === 0 ? "text-red-600" : "text-orange-500"}`}>
                                    {p.stock === 0 ? "Sin stock" : `${p.stock} restantes`}
                                </span>
                            </div>
                        ))}
                        {lowStock.length === 0 && (
                            <p className="text-sm text-gray-400">Todos los productos tienen stock suficiente.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminStats;