const Hero = () => {
    return (
        <section className="bg-gray-50 flex items-center justify-center min-h-[calc(100vh-64px)]">
            <div className="mx-auto w-screen max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
                <div className="mx-auto max-w-prose text-center">
                    <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-700 mb-6">
                        ✦ Nuevos productos cada semana
                    </span>

                    <h1 className="text-4xl font-bold text-gray-900 sm:text-6xl leading-tight">
                        Todo lo que necesitás,{" "}
                        <span className="text-indigo-600">en un solo lugar</span>
                    </h1>

                    <p className="mt-6 text-base text-gray-600 sm:text-lg leading-relaxed">
                        En <span className="font-semibold text-gray-900">Velora</span> encontrás tecnología, moda, hogar y mucho más.
                        Comprá fácil, rápido y seguro con los mejores precios del mercado.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

                        <a
                            className="inline-block rounded-lg bg-indigo-600 px-8 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
                            href="/shop"
                            >
                            Ver productos
                        </a>
                        <a
                            className="inline-block rounded-lg border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                            href="/shop"
                            >
                            Ver categorías
                        </a>
                    </div>

                    <div className="mt-14 grid grid-cols-3 divide-x divide-gray-200 border border-gray-200 rounded-xl bg-white shadow-sm">
                        <div className="py-6">
                            <p className="text-3xl font-bold text-indigo-600">+500</p>
                            <p className="mt-1 text-sm text-gray-500">Productos</p>
                        </div>
                        <div className="py-6">
                            <p className="text-3xl font-bold text-indigo-600">+20</p>
                            <p className="mt-1 text-sm text-gray-500">Categorías</p>
                        </div>
                        <div className="py-6">
                            <p className="text-3xl font-bold text-indigo-600">+1000</p>
                            <p className="mt-1 text-sm text-gray-500">Clientes felices</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;