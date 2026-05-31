import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import CategoriesSection from "../components/CategoriesSection.tsx";
import ProductGrid from "../components/product/ProductGrid.tsx";
import {useEffect, useState} from "react";
import type {PageResponse, Product} from "../types";
import api from "../api/axiosConfig.ts";
import {toast} from "sonner";
import SearchBar from "../components/product/SearchBar.tsx";

const ShopPage = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [inputValue, setInputValue] = useState('');
    const [textSearch, setTextSearch] = useState('');

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const [sort, _setSort] = useState('name');

    const [loading, setLoading] = useState(false);

    const [category, setCategory] = useState('');

    const [minPrice, _setMinPrice] = useState('');

    const [maxPrice, _setMaxPrice] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [page, textSearch, category, sort, minPrice, maxPrice]);

    const handleSearch = () => {
        setPage(0);
        setTextSearch(inputValue);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();

            params.append('page', page.toString());
            params.append('size', '12');
            params.append('sort', sort);

            if (textSearch) {
                params.append('search', textSearch);
            }

            if (category) {
                params.append('category', category);
            }

            if (minPrice) {
                params.append('minPrice', minPrice);
            }

            if (maxPrice) {
                params.append('maxPrice', maxPrice);
            }

            const response = await api.get<PageResponse<Product>>
                (`/products?${params.toString()}`);

            setProducts(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err: any) {
            toast.error("Error al cargar los productos")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-indigo-50">
                <SearchBar
                    textSearch={inputValue}
                    onTextChange={setInputValue}
                    onSearch={handleSearch}
                />

                <CategoriesSection
                    selectedCategory={category}
                    onSelectCategory={(newCategory) => {
                        setPage(0);
                        setCategory(newCategory);
                    }}
                />

                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <ProductGrid
                        products={products}
                        loading={loading}
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                </div>
            </main>

            <Footer />
        </>
    );
}

export default ShopPage;