import ProductCard from "./ProductCard.tsx";
import type { Product } from "../../types";

interface Props {
    products: Product[];
    loading: boolean;
    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
}

const ProductGrid = ({
                         products,
                         loading,
                         page,
                         totalPages,
                         onPageChange,
                     }: Props) => {
    const classBtnPagination = "bg-white grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white";

    if (loading) return <p>Cargando productos...</p>;
    if (products.length === 0) return <p>No se encontraron productos</p>;

    // Solo calcular páginas visibles si tenemos los datos necesarios
    const showPagination = page !== undefined && totalPages !== undefined && onPageChange && totalPages > 1;

    const visiblePages: number[] = [];
    if (showPagination) {
        for (let i = Math.max(0, page - 2); i <= Math.min(totalPages - 1, page + 2); i++) {
            visiblePages.push(i);
        }
    }

    return (
        <>
            <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {showPagination && (
                <ul className="flex justify-center pt-4 gap-1 text-black">
                    <li>
                        <button
                            disabled={page === 0}
                            onClick={() => onPageChange(page - 1)}
                            className={classBtnPagination}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>

                    {visiblePages.map((pageNumber) => (
                        <li key={pageNumber}>
                            <button
                                onClick={() => onPageChange(pageNumber)}
                                className={`block size-8 rounded border text-center text-sm font-medium ${
                                    page === pageNumber
                                        ? "border-indigo-600 bg-indigo-600 text-white"
                                        : "border-gray-200 bg-white"
                                }`}
                            >
                                {pageNumber + 1}
                            </button>
                        </li>
                    ))}

                    <li>
                        <button
                            disabled={page === totalPages - 1}
                            onClick={() => onPageChange(page + 1)}
                            className={classBtnPagination}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                </ul>
            )}
        </>
    );
};

export default ProductGrid;