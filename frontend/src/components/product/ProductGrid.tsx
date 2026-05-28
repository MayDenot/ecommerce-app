import ProductCard from "./ProductCard.tsx";
import type { Product } from "../../types";

interface Props {
    products: Product[];
}

const ProductGrid = ({ products }: Props) => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;