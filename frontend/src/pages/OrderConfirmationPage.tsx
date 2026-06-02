import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";
import type { Order } from "../types";

const OrderConfirmationPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get<Order>(`/orders/${id}`)
            .then((res) => setOrder(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);

    const statusLabel: Record<string, string> = {
        PAID: "Pago confirmado",
        PENDING: "Pendiente",
        SHIPPED: "Enviado",
        DELIVERED: "Entregado",
        CANCELLED: "Cancelado",
    };

    if (loading) return (
        <>
            <Navbar />
            <main className="min-h-screen bg-indigo-50 flex items-center justify-center">
                <p className="text-gray-500">Cargando tu orden...</p>
            </main>
            <Footer />
        </>
    );

    if (!order) return (
        <>
            <Navbar />
            <main className="min-h-screen bg-indigo-50 flex items-center justify-center">
                <p className="text-red-500">No se encontró la orden.</p>
            </main>
            <Footer />
        </>
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-indigo-50">
                <div className="mx-auto max-w-2xl px-4 py-12">

                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8 text-green-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            ¡Gracias por tu compra!
                        </h1>
                        <p className="mt-1 text-gray-500">
                            Orden #{order.id} ·{" "}
                            <span className="font-medium text-indigo-600">
                                {statusLabel[order.status] ?? order.status}
                            </span>
                        </p>
                    </div>

                    {/* Items */}
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="divide-y divide-gray-100">
                            {order.items.map((item) => (
                                <div key={item.productId} className="flex items-center gap-4 p-4">
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="h-16 w-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">
                                            {item.productName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {item.quantity} x {formatPrice(item.unitPrice)}
                                        </p>
                                    </div>
                                    <span className="font-semibold text-gray-900">
                                        {formatPrice(item.subtotal)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="border-t border-gray-200 p-4">
                            <div className="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>{formatPrice(order.totalPrice)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Acciones */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <Link
                            to="/orders"
                            className="flex-1 rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Ver mis compras
                        </Link>
                        <Link
                            to="/shop"
                            className="flex-1 rounded-lg bg-indigo-600 px-5 py-3 text-center font-medium text-white transition hover:bg-indigo-700"
                        >
                            Seguir comprando
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default OrderConfirmationPage;