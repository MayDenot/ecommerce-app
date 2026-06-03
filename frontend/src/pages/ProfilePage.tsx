import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {User, ShoppingBag, Wallet} from "lucide-react";
import {useAuth} from "../hooks/useAuth.ts";
import ProfileAvatar from "../components/user/ProfileAvatar.tsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Order} from "../types";
import api from "../api/axiosConfig.ts";
import EditProfileForm from "../components/user/EditProfileForm.tsx";

const ProfilePage = () => {
    const {user} = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [editOpen, setEditOpen] = useState(false);

    const lastOrder = orders.length > 0 ? orders[0] : null;

    const totalSpent = orders.reduce(
        (acc, order) => acc + order.totalPrice,
        0
    );

    const statusMap = {
        PENDING: "Pendiente",
        PAID: "Pagado",
        SHIPPED: "Enviado",
        DELIVERED: "Entregado",
        CANCELLED: "Cancelado",
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await api.get<Order[]>("/orders/my-orders");
        setOrders(response.data);
    };

    if (!user) return null;

    return (
        <>
            <Navbar/>

            <main className="min-h-screen bg-indigo-50">
                <div className="mx-auto max-w-5xl px-4 py-10">

                    {/* HEADER */}
                    <div
                        className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 to-indigo-500 shadow-lg">
                        <div className="flex flex-col items-center gap-6 px-8 py-10 md:flex-row">
                            <ProfileAvatar size="lg"/>

                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-3xl font-bold text-white">
                                    {user.name}
                                </h1>

                                <p className="mt-1 text-indigo-100">
                                    {user.email}
                                </p>

                                <span
                                    className={`
                                        mt-4 inline-flex rounded-full px-4 py-1 text-sm font-medium
                                        ${
                                            user.role === "ADMIN"
                                                ? "bg-amber-400 text-amber-900"
                                                : "bg-white/20 text-white"
                                        }
                                    `}
                                >
                                    {user.role === "ADMIN"
                                        ? "Administrador"
                                        : "Cliente"}
                                </span>
                            </div>

                            <button
                                onClick={() => setEditOpen(true)}
                                className="
                                rounded-xl bg-white px-5 py-3
                                font-medium text-indigo-700
                                transition hover:bg-indigo-100
                                cursor-pointer
                                "
                            >
                                Editar perfil
                            </button>
                        </div>
                    </div>

                    {/* ESTADISTICAS */}
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <ShoppingBag className="mb-3 text-indigo-600" size={28}/>

                            <p className="text-sm text-gray-500">
                                Pedidos realizados
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                {orders.length}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <User className="mb-3 text-indigo-600" size={28}/>

                            <p className="text-sm text-gray-500">
                                Tipo de cuenta
                            </p>

                            <p className="mt-2 text-lg font-semibold text-gray-900">
                                {user.role}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white p-6 shadow-sm">
                            <Wallet className="mb-3 text-indigo-600" size={28} />

                            <p className="text-sm text-gray-500">
                                Total gastado
                            </p>

                            <p className="mt-2 text-3xl font-bold text-gray-900">
                                ${totalSpent.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* DATOS */}
                    <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-xl font-semibold text-gray-900">
                            Información de la cuenta
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2">

                            <div>
                                <p className="mb-2 text-sm text-gray-500">
                                    Nombre
                                </p>

                                <div className="rounded-xl border border-gray-200 px-4 py-3">
                                    {user.name}
                                </div>
                            </div>

                            <div>
                                <p className="mb-2 text-sm text-gray-500">
                                    Correo electrónico
                                </p>

                                <div className="rounded-xl border border-gray-200 px-4 py-3">
                                    {user.email}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* ULTIMO PEDIDO */}
                    {lastOrder && (
                        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
                            <h2 className="mb-6 text-xl font-semibold text-gray-900">
                                Último pedido
                            </h2>

                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                <div className="flex items-center gap-4">
                                    <img
                                        src={lastOrder.items[0]?.image}
                                        alt={lastOrder.items[0]?.productName}
                                        className="h-20 w-20 rounded-xl object-cover"
                                    />

                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {lastOrder.items[0]?.productName}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {lastOrder.items.length} producto
                                            {lastOrder.items.length > 1 ? "s" : ""}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Fecha
                                    </p>

                                    <p className="font-medium">
                                        {new Date(lastOrder.createdAt)
                                            .toLocaleDateString("es-AR")}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        ${lastOrder.totalPrice.toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Estado
                                    </p>

                                    <span
                                        className="
                                            rounded-full
                                            bg-green-100
                                            px-3 py-1
                                            text-sm
                                            font-medium
                                            text-green-700
                                        "
                                                        >
                                        {statusMap[lastOrder.status]}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ACCIONES */}
                    <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm">

                        <h2 className="mb-6 text-xl font-semibold">
                            Acciones rápidas
                        </h2>

                        <div className="grid gap-4 md:grid-cols-2">

                            <Link
                                to="/orders"
                                className="
                                    rounded-xl border border-gray-200
                                    p-5 transition hover:border-indigo-300
                                    hover:bg-indigo-50
                                "
                            >
                                <ShoppingBag className="mb-3 text-indigo-600"/>

                                <h3 className="font-semibold">
                                    Ver mis pedidos
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Consultá el historial de compras.
                                </p>
                            </Link>

                            {user.role === "ADMIN" && (
                                <Link
                                    to="/dashboard"
                                    className="
                                    rounded-xl border border-gray-200
                                    p-5 transition hover:border-indigo-300
                                    hover:bg-indigo-50
                                "
                                >
                                    <User className="mb-3 text-indigo-600"/>

                                    <h3 className="font-semibold">
                                        Panel de administración
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Gestioná productos y categorías.
                                    </p>
                                </Link>
                            )}

                        </div>
                    </div>

                </div>
                {editOpen && <EditProfileForm onClose={() => setEditOpen(false)} />}
            </main>

            <Footer/>
        </>
    );
};

export default ProfilePage;