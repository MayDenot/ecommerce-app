import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth.ts";
import { Link, useNavigate } from "react-router-dom";
import ProfileAvatar from "./user/ProfileAvatar.tsx";

const Navbar = () => {
    const { user, logout } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const menuRef = useRef<HTMLDivElement>(null);

    const navLinkClass =
        "relative text-white transition-colors duration-200 hover:text-indigo-200 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-indigo-200 after:transition-all after:duration-300 hover:after:w-full";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-indigo-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <Link
                            className="flex items-center gap-2 text-white"
                            to="/"
                        >
                            <svg
                                viewBox="0 0 64 64"
                                xmlns="http://www.w3.org/2000/svg"
                                width="64"
                                height="64"
                            >
                                <rect
                                    width="64"
                                    height="64"
                                    rx="14"
                                    fill="#4338ca"
                                />

                                <text
                                    x="32"
                                    y="44"
                                    fontFamily="Georgia, serif"
                                    fontSize="36"
                                    fontWeight="bold"
                                    fill="white"
                                    textAnchor="middle"
                                    letterSpacing="-1"
                                >
                                    V
                                </text>

                                <line
                                    x1="14"
                                    y1="50"
                                    x2="50"
                                    y2="50"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    opacity="0.6"
                                />

                                <line
                                    x1="19"
                                    y1="55"
                                    x2="45"
                                    y2="55"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    opacity="0.35"
                                />
                            </svg>

                            <span className="text-xl font-bold tracking-wide">
                                Velora
                            </span>
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav
                            aria-label="Global"
                            className="hidden md:block"
                        >
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link
                                        className={navLinkClass}
                                        to="/"
                                    >
                                        Inicio
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className={navLinkClass}
                                        to="/shop"
                                    >
                                        Tienda
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className={navLinkClass}
                                        to="/categories"
                                    >
                                        Categorías
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        className={navLinkClass}
                                        to="/cart"
                                    >
                                        Carrito
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {user && (
                            <div
                                ref={menuRef}
                                className="hidden md:relative md:block"
                            >
                                <button
                                    type="button"
                                    className="cursor-pointer"
                                    onClick={() =>
                                        setIsOpen((prev) => !prev)
                                    }
                                >
                                    <span className="sr-only">
                                        Toggle profile menu
                                    </span>

                                    <ProfileAvatar />
                                </button>

                                {isOpen && (
                                    <div
                                        className="
                                            absolute end-0 z-10 mt-2
                                            w-56 divide-y divide-gray-100
                                            rounded-md border border-gray-100
                                            bg-white shadow-lg
                                        "
                                        role="menu"
                                    >
                                        <div className="p-2">
                                            <Link
                                                to="/me"
                                                onClick={() =>
                                                    setIsOpen(false)
                                                }
                                                className="
                                                    block rounded-lg
                                                    px-4 py-2 text-sm
                                                    text-gray-500
                                                    hover:bg-gray-50
                                                    hover:text-gray-700
                                                "
                                            >
                                                Mi perfil
                                            </Link>

                                            <Link
                                                to="/orders"
                                                onClick={() =>
                                                    setIsOpen(false)
                                                }
                                                className="
                                                    block rounded-lg
                                                    px-4 py-2 text-sm
                                                    text-gray-500
                                                    hover:bg-gray-50
                                                    hover:text-gray-700
                                                "
                                            >
                                                Mis compras
                                            </Link>
                                        </div>

                                        <div className="p-2">
                                            <button
                                                className="
                                                    flex w-full items-center gap-2
                                                    rounded-lg px-4 py-2
                                                    text-sm text-red-700
                                                    hover:bg-red-50
                                                "
                                                role="menuitem"
                                                onClick={handleLogout}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="size-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                                                    />
                                                </svg>

                                                Cerrar sesión
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="block md:hidden">
                            <button
                                className="
                                    rounded-sm bg-gray-100 p-2
                                    text-gray-600 transition
                                    hover:text-gray-600/75
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;