import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import CategoriesSection from "../components/CategoriesSection.tsx";
import SearchBar from "../components/product/SearchBar.tsx";
import ProductGrid from "../components/product/ProductGrid.tsx";
import {useEffect, useState} from "react";
import type {Product} from "../types";
import api from "../api/axiosConfig.ts";
import {toast} from "sonner";

const ShopPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await api.get<Product[]>(`/products`);
            setProducts(response.data);
        } catch (err: any) {
            toast.error("Error al cargar los productos")
        }
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50">
                <SearchBar />

                <CategoriesSection />

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <ProductGrid products={products} />
                </div>
            </main>

            <Footer />
        </>
    );
}

export default ShopPage;