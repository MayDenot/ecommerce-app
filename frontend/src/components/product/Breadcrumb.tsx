import {Link} from "react-router-dom";

interface Props {
    productName: string;
}

const Breadcrumb = ({productName}: Props) => {
    return (
        <section className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <nav className="text-sm text-gray-500">
                    <ol className="flex items-center gap-2">
                        <li>
                            <Link
                                to="/"
                                className="transition hover:text-indigo-600"
                            >
                                Inicio
                            </Link>
                        </li>

                        <li>/</li>

                        <li>
                            <Link
                                to="/shop"
                                className="transition hover:text-indigo-600"
                            >
                                Tienda
                            </Link>
                        </li>

                        <li>/</li>

                        <li className="font-medium text-gray-900">
                            {productName}
                        </li>
                    </ol>
                </nav>
            </div>
        </section>
    );
}

export default Breadcrumb;