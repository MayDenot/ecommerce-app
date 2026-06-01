import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api/axiosConfig";
import type {Order} from "../types";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get("/orders");
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("es-AR");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "DELIVERED":
                return "bg-green-100 text-green-700";

            case "SHIPPED":
                return "bg-blue-100 text-blue-700";

            case "PAID":
                return "bg-indigo-100 text-indigo-700";

            case "PENDING":
                return "bg-yellow-100 text-yellow-700";

            case "CANCELLED":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-indigo-50">
                <div className="mx-auto max-w-6xl px-4 py-8">
                    <h1 className="mb-8 text-3xl font-bold text-gray-900">
                        Mis compras
                    </h1>

                    <div className="space-y-6">
                        {orders.map((order: Order) => (
                            <div
                                key={order.id}
                                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h2 className="font-semibold text-gray-900">
                                            Pedido #{order.id}
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            {formatDate(order.createdAt)}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div
                                            key={item.productId}
                                            className="flex items-center gap-4"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.productName}
                                                className="h-20 w-20 rounded-lg object-cover"
                                            />

                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {item.productName}
                                                </h3>

                                                <p className="text-sm text-gray-500">
                                                    Cantidad: {item.quantity}
                                                </p>
                                            </div>

                                            <span className="font-semibold text-gray-900">
                                                {formatPrice(item.subtotal)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 border-t border-gray-200 pt-4">
                                    <div className="flex justify-between">
                                        <span className="font-medium text-gray-700">
                                            Total
                                        </span>

                                        <span className="text-lg font-bold text-gray-900">
                                            {formatPrice(order.totalPrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default OrdersPage;