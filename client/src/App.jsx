import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import About from "./pages/About";
import AddProduct from "./admin/AddProduct";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./admin/AdminDashboard";
import UserOrders from "./admin/UserOrders";
import AdminOrderDetails from "./admin/AdminOrderDetails";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./admin/EditProduct";
import Contact from "./pages/Contact";
import MyOrders from "./pages/MyOrders";
import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnRefundPolicy from "./pages/ReturnRefund";
import TermsAndConditions from "./pages/TermsCondition";
import FAQs from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users/:id" element={<UserOrders />} />
        <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
        <Route path="/admin/products" element={<ManageProducts />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/faqs" element={<FAQs />} />
      </Routes>
    </>
  );
}

export default App;