import type { Product } from "../../types";
import {Link} from "react-router-dom";

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    return (
        <Link
            to={`/products/${product.id}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
            <div className="h-72 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://placehold.co/400x300?text=Sin+imagen";
                        e.currentTarget.onerror = null;
                    }}
                />
            </div>

            <div className="flex flex-1 flex-col p-6">

                <p className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                </p>

                <h3 className="mt-2 line-clamp-2 text-lg font-medium text-gray-900">
                    {product.name}
                </h3>

                <p className="mt-2 line-clamp-3 text-sm text-gray-700">
                    {product.description}
                </p>
            </div>
        </Link>
    );
}

export default ProductCard;