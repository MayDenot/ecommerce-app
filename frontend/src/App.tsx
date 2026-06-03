import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CategoriesPage from "./pages/CategoriesPage";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import DashboardPage from "./components/admin/DashboardPage.tsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>

                    {/* Públicas */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protegidas */}
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <CartPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <OrdersPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders/confirmation/:id"
                        element={
                            <ProtectedRoute>
                                <OrderConfirmationPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/me"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />


                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute roles={["ADMIN"]}>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />


                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;