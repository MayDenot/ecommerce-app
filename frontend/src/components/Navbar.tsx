import {useState} from "react";
import {useAuth} from "../hooks/useAuth.ts";
import {useNavigate} from "react-router-dom";
import ProfileAvatar from "./user/ProfileAvatar.tsx";

const Navbar = () => {
    const {logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header className="bg-indigo-700">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 md:flex md:items-center md:gap-12">
                        <a className="flex items-center gap-2 text-white" href="/">
                            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="64" height="64">
                                <rect width="64" height="64" rx="14" fill="#4338ca"/>
                                <text x="32" y="44" font-family="Georgia, serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="-1">V</text>
                                <line x1="14" y1="50" x2="50" y2="50" stroke="white" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
                                <line x1="19" y1="55" x2="45" y2="55" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.35"/>
                            </svg>
                            <span className="text-xl font-bold tracking-wide">Velora</span>
                        </a>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <a className="text-white transition hover:text-gray-500/75" href="/"> Home </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-gray-500/75" href="/shop"> Shop </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-gray-500/75" href="/categories"> Categories </a>
                                </li>

                                <li>
                                    <a className="text-white transition hover:text-gray-500/75" href="/cart"> Cart </a>
                                </li>
                            </ul>
                        </nav>

                        <div className="hidden md:relative md:block">
                            <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="sr-only">Toggle dashboard menu</span>
                                <ProfileAvatar size="sm" />
                            </button>

                            {isOpen && (
                                <div
                                    className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                    role="menu">
                                    <div className="p-2">
                                        <a href="#"
                                           className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                           role="menuitem">
                                            My profile
                                        </a>

                                        <a href="#"
                                           className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                           role="menuitem">
                                            My purchases
                                        </a>
                                    </div>

                                    <div className="p-2">
                                        <button
                                            className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                            role="menuitem"
                                            onClick={handleLogout}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="size-4">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"></path>
                                            </svg>

                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="block md:hidden">
                            <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;