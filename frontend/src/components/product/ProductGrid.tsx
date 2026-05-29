import ProductCard from "./ProductCard.tsx";
import type { Product } from "../../types";

interface Props {
    products: Product[],
    loading: boolean,
}

const ProductGrid = ({ products, loading }: Props) => {
    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (products.length === 0) {
        return <p>No se encontraron productos</p>;
    }

    return (
        <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: Product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductGrid;