import { Link, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();

    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex flex-col">
          <span className="text-3xl font-bold text-[#8B1E3F]">
            Vaidarbhi
          </span>

          <span className="text-sm tracking-[3px] text-[#C9A227] uppercase">
            Sarees
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8 font-medium">
          <Link to="/" className="hover:text-[#8B1E3F]">
            Home
          </Link>

          <Link to="/shop" className="hover:text-[#8B1E3F]">
            Shop
          </Link>

          <Link to="/about" className="hover:text-[#8B1E3F]">
            About
          </Link>

          <Link to="/contact" className="hover:text-[#8B1E3F]">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-2xl">

          <FiSearch className="cursor-pointer hover:text-[#8B1E3F]" />

          <Link to="/wishlist">
            <FiHeart className="cursor-pointer hover:text-[#8B1E3F]" />
          </Link>

          <Link to="/cart">
            <FiShoppingCart className="cursor-pointer hover:text-[#8B1E3F]" />
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
              >
                <FiUser className="hover:text-[#8B1E3F]" />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl border overflow-hidden z-50">

                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    👤 My Profile
                  </Link>

                  <Link
  to="/myorders"
  onClick={() => setOpen(false)}
  className="block px-4 py-3 hover:bg-gray-100"
>
  📦 My Orders
</Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      ⚙️ Admin Dashboard
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    🔓 Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FiUser className="cursor-pointer hover:text-[#8B1E3F]" />
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};

export default Navbar;