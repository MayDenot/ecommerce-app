import type { Review } from "../types";

type Props = {
    reviews: Review[];
    loading: boolean;
};

const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className={`text-lg leading-none ${
                    star <= rating ? "text-yellow-400" : "text-gray-200"
                }`}
            >
                ★
            </span>
        ))}
    </div>
);

const averageRating = (reviews: Review[]) => {
    if (!reviews.length) return 0;
    return reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
};

const ReviewsSection = ({ reviews, loading }: Props) => {
    const avg = averageRating(reviews);

    return (
        <section className="bg-indigo-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <h2 className="text-2xl font-bold text-gray-900 mb-10">
                    Opiniones de clientes
                </h2>

                {loading && (
                    <p className="text-gray-500">Cargando reseñas...</p>
                )}

                {!loading && reviews.length === 0 && (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-indigo-400 bg-gray-50 py-16 text-center">
                        <span className="text-5xl mb-4">💬</span>
                        <p className="font-semibold text-gray-700">Todavía no hay reseñas</p>
                        <p className="text-sm text-gray-400 mt-1">Sé el primero en dejar tu opinión.</p>
                    </div>
                )}

                {!loading && reviews.length > 0 && (
                    <div className="grid gap-10 lg:grid-cols-3">

                        {/* Resumen */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 flex flex-col items-center justify-center text-center h-fit">
                            <p className="text-6xl font-bold text-gray-900">{avg.toFixed(1)}</p>
                            <StarDisplay rating={Math.round(avg)} />
                            <p className="mt-2 text-sm text-gray-500">
                                Basado en {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
                            </p>

                            {/* Barras por estrella */}
                            <div className="mt-6 w-full space-y-2">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = reviews.filter((r) => r.rating === star).length;
                                    const pct = reviews.length ? (count / reviews.length) * 100 : 0;
                                    return (
                                        <div key={star} className="flex items-center gap-2 text-sm">
                                            <span className="w-4 text-gray-500 text-right">{star}</span>
                                            <span className="text-yellow-400 text-xs">★</span>
                                            <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                                                <div
                                                    className="h-full bg-yellow-400 rounded-full transition-all"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                            <span className="w-4 text-gray-400">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Lista de reseñas */}
                        <div className="lg:col-span-2 space-y-4">
                            {reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                                                {review.userName?.[0]?.toUpperCase() ?? "?"}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900 text-sm">
                                                    {review.userName}
                                                </p>
                                                <StarDisplay rating={review.rating} />
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {new Date(review.createdAt).toLocaleDateString("es-AR", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-gray-700 text-sm leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReviewsSection;