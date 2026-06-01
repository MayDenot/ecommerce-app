import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";
import { ArrowRight } from "lucide-react";

interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get("/categories");
            setCategories(response.data.content ?? response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-indigo-50">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Explora nuestras categorías
                        </h1>

                        <p className="mt-3 text-lg text-gray-600">
                            Encontrá productos organizados por categoría.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/shop?category=${encodeURIComponent(category.name)}`}
                                className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                    <div className="absolute bottom-4 left-4">
                                        <h2 className="text-2xl font-bold text-white">
                                            {category.name}
                                        </h2>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <p className="line-clamp-2 text-sm text-gray-600">
                                        {category.description}
                                    </p>

                                    <div className="mt-4 flex items-center font-medium text-indigo-600">
                                        Ver productos
                                        <ArrowRight
                                            size={18}
                                            className="ml-2 transition-transform group-hover:translate-x-1"
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
};

export default CategoriesPage;