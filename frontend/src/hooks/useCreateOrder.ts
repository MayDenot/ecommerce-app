import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import type { Order } from "../types";

export const useCreateOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const checkout = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post<Order>("/orders/checkout");
            navigate(`/orders/confirmation/${response.data.id}`);
        } catch (err: any) {
            const msg = err.response?.data?.message ?? "Error al procesar la compra";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const buyNow = async (
        productId: number,
        quantity: number
    ) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api.post<Order>(
                "/orders/buy-now",
                {
                    productId,
                    quantity,
                }
            );

            navigate(
                `/orders/confirmation/${response.data.id}`
            );
        } catch (err: any) {
            const msg =
                err.response?.data?.message ??
                "Error al procesar la compra";

            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return { checkout, buyNow, loading, error };
};