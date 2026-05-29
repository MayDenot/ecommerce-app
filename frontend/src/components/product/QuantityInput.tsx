
interface Props {
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput = ({quantity, setQuantity}: Props) => {
    return (
        <div className="mt-8">
            <p className="mb-3 text-sm font-medium text-gray-900">
                Cantidad
            </p>

            <div
                className="inline-flex items-center rounded-lg border border-gray-200 bg-white">
                <button
                    onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="px-4 py-2 text-lg text-gray-600 transition hover:bg-gray-100"
                >
                    -
                </button>

                <span
                    className="min-w-[60px] border-x border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-900">
                                                {quantity}
                                            </span>

                <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-4 py-2 text-lg text-gray-600 transition hover:bg-gray-100"
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default QuantityInput;