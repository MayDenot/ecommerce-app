import { useState } from "react";
import api from "../api/axiosConfig.ts";

interface Props {
    productId: number;
    onReviewCreated: () => void;
}

const ReviewForm = ({ productId, onReviewCreated }: Props) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post(`/products/${productId}/reviews`, { rating, comment });
            setComment("");
            setRating(5);
            onReviewCreated();
        } finally {
            setLoading(false);
        }
    };

    const stars = [1, 2, 3, 4, 5];

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 rounded-xl border border-indigo-300 bg-white p-6 shadow-md"
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-5">
                Dejar una reseña
            </h3>

            {/* Star rating interactivo */}
            <div className="flex gap-1 mb-5">
                {stars.map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                        <span className={star <= rating ? "text-yellow-400" : "text-gray-300"}>
                            ★
                        </span>
                    </button>
                ))}
                <span className="ml-2 text-sm text-gray-500 self-center">
                    {rating} {rating === 1 ? "estrella" : "estrellas"}
                </span>
            </div>

            <textarea
                className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition"
                rows={4}
                placeholder="Contanos qué te pareció..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />

            <button
                type="submit"
                disabled={loading || !comment.trim()}
                className="mt-4 w-full sm:w-auto rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 text-sm font-medium text-white transition-colors"
            >
                {loading ? "Publicando..." : "Publicar reseña"}
            </button>
        </form>
    );
};
export default ReviewForm;