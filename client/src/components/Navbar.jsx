import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();

    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-[#8B1E3F] font-bold"
      : "text-gray-700 hover:text-[#8B1E3F] transition font-medium";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src={logo}
              alt="Vaidarbhi Sarees"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full"
            />

            <div className="flex flex-col justify-center">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-[#8B1E3F] leading-tight whitespace-nowrap">
                Vaidarbhi
              </h1>

              <p className="text-[9px] sm:text-xs uppercase tracking-[3px] sm:tracking-[4px] text-[#C9A227] leading-none">
                Sarees
              </p>
            </div>
          </Link>

          {/* Centered Nav Links for Desktop */}
          <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-base font-medium">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/products" className={navClass}>
              Shop
            </NavLink>

            <NavLink to="/about" className={navClass}>
              About
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
          </nav>

          {/* Action Icons & Mobile Menu Button */}
          <div className="flex items-center gap-3 sm:gap-5 text-xl sm:text-2xl shrink-0">
            <button className="hover:text-[#8B1E3F] transition p-1" aria-label="Search">
              <FiSearch />
            </button>

            <Link to="/wishlist" className="hover:text-[#8B1E3F] transition p-1" aria-label="Wishlist">
              <FiHeart />
            </Link>

            <Link to="/cart" className="hover:text-[#8B1E3F] transition p-1" aria-label="Cart">
              <FiShoppingCart />
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="hover:text-[#8B1E3F] transition flex items-center p-1"
                  aria-label="User profile"
                >
                  <FiUser />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">
                    <div className="px-4 py-3 border-b bg-gray-50">
                      <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      👤 My Profile
                    </Link>

                    <Link
                      to="/myorders"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      📦 My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                    >
                      ❤️ Wishlist
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        ⚙️ Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition border-t"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hover:text-[#8B1E3F] transition p-1" aria-label="Login">
                <FiUser />
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-2xl hover:text-[#8B1E3F] transition p-1 text-gray-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu (Centered) */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t py-4 flex flex-col items-center justify-center gap-4 text-center bg-white">
            <NavLink
              to="/"
              className={navClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className={navClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              className={navClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className={navClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;