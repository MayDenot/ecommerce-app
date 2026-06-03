import { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AdminStats from "../admin/AdminStats";
import AdminOrders from "../admin/AdminOrders";
import AdminUsers from "../admin/AdminUsers";
import AdminProducts from "../admin/AdminProducts";
import { LayoutDashboard, Package, ShoppingBag, Users } from "lucide-react";

type Tab = "dashboard" | "products" | "orders" | "users";

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Dashboard",  icon: <LayoutDashboard size={16} /> },
    { key: "products",  label: "Productos",  icon: <Package size={16} /> },
    { key: "orders",    label: "Órdenes",    icon: <ShoppingBag size={16} /> },
    { key: "users",     label: "Usuarios",   icon: <Users size={16} /> },
];

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>("dashboard");

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-indigo-50">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900">
                        Panel de administración
                    </h1>

                    {/* Tabs */}
                    <div className="mb-6 flex gap-2 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition whitespace-nowrap cursor-pointer
                                    ${activeTab === tab.key
                                    ? "bg-indigo-600 text-white shadow-sm"
                                    : "bg-white text-gray-600 hover:bg-indigo-50 border border-gray-200"
                                }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Contenido */}
                    {activeTab === "dashboard" && <AdminStats />}
                    {activeTab === "products"  && <AdminProducts />}
                    {activeTab === "orders"    && <AdminOrders />}
                    {activeTab === "users"     && <AdminUsers />}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default DashboardPage;