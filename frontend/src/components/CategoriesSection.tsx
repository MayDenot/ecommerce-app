import {useEffect, useState} from "react";
import type {Category} from "../types";
import api from "../api/axiosConfig.ts";
import {toast} from "sonner";

type Props = {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
};

const CategoriesSection = ({selectedCategory, onSelectCategory}: Props) => {
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
                        onClick={() => {
                            if (selectedCategory === category.name) {
                                onSelectCategory('');
                            } else {
                                onSelectCategory(category.name);
                            }
                        }}
                        className={`
                            rounded-full border px-5 py-2 text-sm font-medium transition
                            ${
                                selectedCategory === category.name
                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-500 hover:text-indigo-600'
                            }
                        `}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;