import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import {useEffect, useState} from "react";
import type {Cart, CartItem} from "../types";
import api from "../api/axiosConfig.ts";
import {useCreateOrder} from "../hooks/useCreateOrder.ts";

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { checkout, loading, error } = useCreateOrder();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await api.get<Cart>(`/cart`);
            setCartItems(response.data.items);
        } catch (error) {
            console.error(error);
        }
    };

    const changeQuantity = async (itemId: number, quantity: number) => {
        if (quantity < 1) return;

        try {
            const response = await api.patch(
                `/cart/items/${itemId}`,
                null,
                {
                    params: { quantity }
                }
            );

            setCartItems(response.data.items);

        } catch (error) {
            console.error(error);
        }
    };

    const deleteItem = async (itemId: number) => {
        try {
            setCartItems(prev => prev.filter(item => item.id !== itemId));
            await api.delete(`/cart/items/${itemId}`);
        } catch (error) {
            console.error(error);
            await fetchCartItems();
        }
    };

    const clearCart = async () => {
        try {
            setCartItems([]);
            await api.delete(`/cart/clear`);
        } catch (error) {
            console.error(error);
            await fetchCartItems();
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    const IVA_RATE = 0.21;
    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(price);

    return (
        <>
        <Navbar/>
        <main className="min-h-screen bg-indigo-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">
                    Mi carrito
                </h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
                    {/* Productos */}
                    <section>
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt="Producto"
                                            className="h-24 w-24 rounded-lg object-cover flex-shrink-0"
                                        />

                                        <div className="flex flex-1 flex-col justify-between">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {item.productName}
                                                    </h3>

                                                    <span className="mt-1 text-sm text-gray-500">
                                                        {formatPrice(item.subtotal)}
                                                    </span>
                                                </div>

                                                <span className="text-lg font-semibold text-gray-900">
                                                    {formatPrice(item.unitPrice)}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-end gap-2 mt-3">
                                                {/* Stepper */}
                                                <div className="flex items-center rounded-lg border border-gray-300 bg-white overflow-hidden">
                                                    <button
                                                        onClick={() => changeQuantity(item.id, item.quantity - 1)}
                                                        className="flex h-8 w-8 items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition cursor-pointer"
                                                        aria-label="Disminuir cantidad"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                                                        </svg>
                                                    </button>

                                                    <span className="w-8 text-center text-sm font-medium text-gray-900 select-none">
                                                            {item.quantity}
                                                        </span>

                                                    <button
                                                        onClick={() => changeQuantity(item.id, item.quantity + 1)}
                                                        className="flex h-8 w-8 items-center justify-center text-blue-500 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                                                        aria-label="Aumentar cantidad"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                                        </svg>
                                                    </button>
                                                </div>

                                                {/* Botón eliminar */}
                                                <button
                                                    onClick={() => deleteItem(item.id)}
                                                    className="text-gray-500 transition hover:text-red-500 cursor-pointer"
                                                    aria-label="Eliminar producto"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Vaciar carrito */}
                        {cartItems.length > 0 && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={clearCart}
                                    className="text-sm text-gray-400 hover:text-red-500 transition cursor-pointer"
                                >
                                    Vaciar carrito
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Resumen */}
                    <aside className="h-fit lg:sticky lg:top-24">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-6 text-xl font-semibold text-gray-900">
                                Resumen de compra
                            </h2>

                            <dl className="space-y-4 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <dt>Subtotal</dt>
                                    <p>{formatPrice(subtotal)}</p>
                                </div>

                                <div className="flex justify-between">
                                    <dt>IVA (21%)</dt>
                                    <p>{formatPrice(iva)}</p>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-900">
                                        <dt>Total</dt>
                                        <p>{formatPrice(total)}</p>
                                    </div>
                                </div>
                            </dl>

                            <button
                                onClick={checkout}
                                disabled={loading || cartItems.length === 0}
                                className="mt-6 w-full rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {loading ? "Procesando..." : "Finalizar compra"}
                            </button>

                            {error && (
                                <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
                            )}

                            <button className="mt-3 w-full rounded-lg border border-gray-300 px-5 py-3 text-sm text-gray-700 transition hover:bg-gray-50 cursor-pointer">
                                Ver carrito completo
                            </button>

                            <div className="mt-6 border-t border-gray-200 pt-4">
                                <a
                                    href="/shop"
                                    className="block text-center text-sm text-gray-600 hover:text-gray-900"
                                    >
                                    Continuar comprando
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
        <Footer/>
        </>
    );
};

export default CartPage;