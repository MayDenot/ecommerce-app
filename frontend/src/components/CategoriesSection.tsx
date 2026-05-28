import {useEffect, useState} from "react";
import type {Category} from "../types";
import api from "../api/axiosConfig.ts";
import {toast} from "sonner";

const CategoriesSection = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await api.get<Category[]>(`/categories`);
            setCategories(response.data);
        } catch (err: any) {
            toast.error("Error al cargar las categorias")
        }
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition hover:border-indigo-500 hover:text-indigo-600"
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;