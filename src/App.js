import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import Navbar from "./component/common/Navbar";
import Footer from "./component/common/footer";
import { CartProvider } from "./component/context/CartContext";
import Home from "./component/pages/Home";
import ProductDetailsPage from "./component/pages/ProductsDetailsPage";
import CategoryListPage from "./component/pages/CategoryListPage";
import CategoryProductsPage from "./component/pages/CategoryProductsPage";
import CartPage from "./component/pages/CartPage";
import LoginPage from "./component/pages/LoginPage";
import RegisterPage from "./component/pages/RegisterPage";
import ProfilePage from "./component/pages/ProfilePage";
import AddressPage from "./component/pages/AddressPage";
import AdminPage from "./component/Admin/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              {/* OUR ROUTES */}
              <Route exact path='/' element={<Home />} />
              <Route path="product/:productId" element={<ProductDetailsPage />} />
              <Route path="/categories" element={<CategoryListPage />} />
              <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
              <Route path="/add-address" element={<ProtectedRoute element={<AddressPage />} />} />
              <Route path="/edit-address" element={<ProtectedRoute element={<AddressPage />} />} />

              <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
