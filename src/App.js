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

export default function App() {

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          {/* OUR ROUTES */}
          <Route exact path='/' element={<Home />} />
          <Route path="product/:productId" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}