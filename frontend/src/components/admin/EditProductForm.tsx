import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import type { Category, Product } from "../../types";

interface Props {
    product: Product;
    onClose: () => void;
    onUpdated: (product: Product) => void;
}

const EditProductForm = ({
                             product,
                             onClose,
                             onUpdated,
                         }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
    });

    useEffect(() => {
        api.get("/categories")
            .then((r) => setCategories(r.data.content ?? r.data))
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await api.put(
                `/products/${product.id}`,
                form
            );

            onUpdated(data);
            onClose();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Editar producto
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 transition hover:text-gray-600 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 px-6 py-6"
                >
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Nombre
                        </label>

                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Descripción
                        </label>

                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            URL Imagen
                        </label>

                        <input
                            type="text"
                            value={form.image}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    image: e.target.value,
                                })
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Precio
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        price: Number(e.target.value),
                                    })
                                }
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
                                Stock
                            </label>

                            <input
                                type="number"
                                value={form.stock}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        stock: Number(e.target.value),
                                    })
                                }
                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">
                            Categoría
                        </label>

                        <select
                            value={form.categoryId}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    categoryId: Number(e.target.value),
                                })
                            }
                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        >
                            {categories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {form.image && (
                        <div>
                            <p className="mb-2 text-sm font-medium text-gray-700">
                                Vista previa
                            </p>

                            <img
                                src={form.image}
                                alt="Preview"
                                className="h-40 w-full rounded-xl object-cover border border-gray-200"
                            />
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50 cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductForm;