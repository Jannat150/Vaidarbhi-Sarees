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
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();

    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    isActive
      ? "text-[#8B1E3F] font-semibold"
      : "hover:text-[#8B1E3F] transition";

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">

          <img
            src={logo}
            alt="Vaidarbhi Sarees"
            className="w-14 h-14 object-contain"
          />

          <div>
            <h1 className="text-2xl font-bold text-[#8B1E3F]">
              Vaidarbhi
            </h1>

            <p className="text-xs uppercase tracking-[4px] text-[#C9A227]">
              Sarees
            </p>
          </div>

        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-[16px]">

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

        {/* Right Icons */}
        <div className="flex items-center gap-5 text-2xl">

          <button className="hover:text-[#8B1E3F]">
            <FiSearch />
          </button>

          <Link to="/wishlist">
            <FiHeart className="hover:text-[#8B1E3F]" />
          </Link>

          <Link to="/cart">
            <FiShoppingCart className="hover:text-[#8B1E3F]" />
          </Link>

          {/* User */}
          {user ? (
            <div className="relative">

              <button
                onClick={() => setOpen(!open)}
                className="hover:text-[#8B1E3F]"
              >
                <FiUser />
              </button>

              {open && (
                <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-xl border overflow-hidden">

                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>

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

                  <Link
                    to="/wishlist"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    ❤️ Wishlist
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
                    🚪 Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <Link to="/login">
              <FiUser className="hover:text-[#8B1E3F]" />
            </Link>
          )}

          {/* Mobile Menu */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="lg:hidden bg-white border-t">

          <NavLink
            to="/"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={() => setMobileMenu(false)}
          >
            Shop
          </NavLink>

          <NavLink
            to="/about"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={() => setMobileMenu(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className="block px-6 py-4 hover:bg-gray-100"
            onClick={() => setMobileMenu(false)}
          >
            Contact
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/profile"
                className="block px-6 py-4 hover:bg-gray-100"
                onClick={() => setMobileMenu(false)}
              >
                My Profile
              </NavLink>

              <NavLink
                to="/myorders"
                className="block px-6 py-4 hover:bg-gray-100"
                onClick={() => setMobileMenu(false)}
              >
                My Orders
              </NavLink>

              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className="block px-6 py-4 hover:bg-gray-100"
                  onClick={() => setMobileMenu(false)}
                >
                  Admin Dashboard
                </NavLink>
              )}
            </>
          )}

        </div>
      )}
    </header>
  );
};

export default Navbar;