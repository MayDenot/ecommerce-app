import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductGrid from "../components/product/ProductGrid";
import api from "../api/axiosConfig";

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import type {Product, Review} from "../types";
import QuantityInput from "../components/product/QuantityInput.tsx";
import Breadcrumb from "../components/product/Breadcrumb.tsx";
import ReviewsSection from "../components/ReviewsSection.tsx";
import ReviewForm from "../components/ReviewForm.tsx";

const ProductDetailPage = () => {
    const {id} = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);

    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);

    useEffect(() => {
        if (id) {
            fetchProduct();
            fetchReviews();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);

            const response = await api.get(`/products/${id}`);

            setProduct(response.data);

            fetchRelatedProducts(response.data.category?.name);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchReviews = async () => {
        try {
            setReviewsLoading(true);

            const response = await api.get(`/products/${id}/reviews`);

            setReviews(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setReviewsLoading(false);
        }
    };

    const fetchRelatedProducts = async (category?: string) => {
        try {
            const response = await api.get(`/products?category=${category}&size=4`);

            setRelatedProducts(response.data.content || []);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar/>

                <main className="min-h-screen bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <p className="text-center text-lg text-gray-600">
                            Cargando producto...
                        </p>
                    </div>
                </main>

                <Footer/>
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Navbar/>

                <main className="min-h-screen bg-gray-50">
                    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                        <p className="text-center text-lg text-red-500">
                            Producto no encontrado
                        </p>
                    </div>
                </main>

                <Footer/>
            </>
        );
    }

    return (
        <>
            <Navbar/>
            <main className="min-h-screen bg-indigo-50">

                {/* Breadcrumb */}
                <Breadcrumb productName={product.name}/>

                {/* Product */}
                <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="grid gap-10 lg:grid-cols-2">

                        {/* Image */}
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://placehold.co/800x800?text=Sin+imagen";
                                }}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`text-3xl leading-none ${
                                            star <= Math.round(product.averageRating || 0)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    >
                                        ★
                                    </span>
                                ))}

                                <span className="ml-2 text-base font-medium text-gray-600">
                                    {product.averageRating?.toFixed(1) || "0.0"} ({product.totalReviews || 0} reseñas)
                                </span>
                            </div>

                            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
                                {product.name}
                            </h1>

                            <p className="mt-4 text-3xl font-semibold text-indigo-600">
                                ${product.price.toFixed(2)}
                            </p>

                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <p className="leading-relaxed text-gray-700">
                                    {product.description}
                                </p>
                            </div>

                            {/* Stock */}
                            <div className="mt-6 flex items-center gap-2">
                                <span className="h-3 w-3 rounded-full bg-green-500"></span>

                                {product.stock > 0
                                    ?
                                        <p className="text-sm font-medium text-green-700 pr-2">
                                            En stock ({product.stock} disponibles)
                                        </p>
                                    :
                                        <p className="text-sm font-medium text-red-700 pr-2">
                                            Sin stock
                                        </p>
                                }
                            </div>

                            {/* Quantity */}
                            <QuantityInput quantity={quantity} setQuantity={setQuantity}/>

                            {/* Buttons */}
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                                <button
                                    className="flex-1 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700 cursor-pointer">
                                    Agregar al carrito
                                </button>

                                <button
                                    className="rounded-xl bg-blue-700 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-800 cursor-pointer">
                                    Comprar ahora
                                </button>
                            </div>

                            {/* Features */}
                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-xl border border-gray-200 bg-white p-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Envío rápido
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Entrega en 24-48 horas.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Pago seguro
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Protección SSL y pagos cifrados.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-4">
                                    <p className="text-sm font-semibold text-gray-900">
                                        Garantía
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Garantía oficial del producto.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                <section className="border-t border-gray-200 bg-white py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Productos relacionados
                                </h2>

                                <p className="mt-2 text-gray-500">
                                    Productos similares que podrían interesarte.
                                </p>
                            </div>
                        </div>

                        <ProductGrid
                            products={relatedProducts.filter((p) => p.id !== product.id)}
                            loading={false}
                        />

                    </div>
                </section>

                {/* Reviews + Form */}
                <section className="border-t border-gray-200 bg-indigo-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <ReviewsSection reviews={reviews} loading={reviewsLoading} />
                        <ReviewForm productId={product.id} onReviewCreated={fetchReviews} />
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default ProductDetailPage;