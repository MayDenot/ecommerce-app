import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import type {PageResponse, Product} from "../../types";
import { Trash2, Pencil } from "lucide-react";
import EditProductForm from "./EditProductForm.tsx";

const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading]   = useState(true);
    const [selectedProduct, setSelectedProduct] =
        useState<Product | null>(null);

    useEffect(() => {
        api.get<PageResponse<Product>>("/products")
            .then((r) => setProducts(r.data.content))
            .finally(() => setLoading(false));
    }, []);

    const deleteProduct = async (id: number) => {
        if (!confirm("¿Seguro que querés eliminar este producto?")) return;
        await api.delete(`/products/${id}`);
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const formatPrice = (n: number) =>
        new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(n);

    if (loading) return <p className="text-gray-500">Cargando productos...</p>;

    return (
        <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Productos</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                    <tr>
                        <th className="px-6 py-3">Producto</th>
                        <th className="px-6 py-3">Precio</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-10 w-10 rounded-lg object-cover"
                                    />
                                    <span className="font-medium text-gray-900">
                                            {product.name}
                                        </span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {formatPrice(product.price)}
                            </td>
                            <td className="px-6 py-4">
                                    <span className={`font-medium ${
                                        product.stock === 0  ? "text-red-600" :
                                            product.stock <= 5   ? "text-orange-500" :
                                                "text-green-600"}`}>
                                        {product.stock === 0 ? "Sin stock" : product.stock}
                                    </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        className="text-gray-500 transition hover:text-indigo-500 cursor-pointer"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="text-gray-500 transition hover:text-red-500 cursor-pointer"
                                        aria-label="Eliminar producto"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <p className="p-6 text-center text-sm text-gray-400">No hay productos.</p>
                )}
            </div>
            {selectedProduct && (
                <EditProductForm
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onUpdated={(updated) => {
                        setProducts((prev) =>
                            prev.map((p) =>
                                p.id === updated.id ? updated : p
                            )
                        );
                    }}
                />
            )}
        </div>
    );
};

export default AdminProducts;