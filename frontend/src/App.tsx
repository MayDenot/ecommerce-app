import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.tsx";
import ShopPage from "./pages/ShopPage.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
                {/*<Route path="/products/:id" element={<ProductDetailPage />} />*/}
                {/*<Route path="/cart" element={<CartPage />} />*/}

              <Route path="*" element={<Navigate to="/login"/>} />
            </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App
