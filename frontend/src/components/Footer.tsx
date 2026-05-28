const Footer = () => {
    return (
        <footer className="bg-indigo-700 text-white">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="text-xl font-bold tracking-wide">Velora</h3>
                        <p className="mt-3 text-sm text-indigo-200 leading-relaxed">
                            Tu tienda online de confianza. Tecnología, moda, hogar y más — todo en un solo lugar.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-indigo-300">Tienda</h4>
                        <ul className="mt-4 space-y-2 text-sm text-indigo-200">
                            <li><a href="/shop" className="hover:text-white transition">Todos los productos</a></li>
                            <li><a href="#" className="hover:text-white transition">Categorías</a></li>
                            <li><a href="#" className="hover:text-white transition">Ofertas</a></li>
                            <li><a href="#" className="hover:text-white transition">Novedades</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-indigo-300">Mi cuenta</h4>
                        <ul className="mt-4 space-y-2 text-sm text-indigo-200">
                            <li><a href="#" className="hover:text-white transition">Mi perfil</a></li>
                            <li><a href="#" className="hover:text-white transition">Mis pedidos</a></li>
                            <li><a href="#" className="hover:text-white transition">Carrito</a></li>
                            <li><a href="/login" className="hover:text-white transition">Iniciar sesión</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-indigo-300">Contacto</h4>
                        <ul className="mt-4 space-y-2 text-sm text-indigo-200">
                            <li>📧 velora@soporte.com</li>
                            <li>📞 +54 11 1234-5678</li>
                            <li>📍 Buenos Aires, Argentina</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-indigo-500 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-indigo-300">
                    <p>© {new Date().getFullYear()} Velora. Todos los derechos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition">Términos y condiciones</a>
                        <a href="#" className="hover:text-white transition">Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;