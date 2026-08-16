import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiClock,
  FiTrash2,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("searchHistory");
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load search history:", e);
    }
  }, []);

  const saveSearchHistory = (newHistory) => {
    try {
      const trimmed = newHistory.filter((item) => item && item.trim());
      const unique = Array.from(new Set(trimmed)).slice(0, 10);
      localStorage.setItem("searchHistory", JSON.stringify(unique));
      setSearchHistory(unique);
    } catch (e) {
      console.error("Failed to save search history:", e);
    }
  };

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

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && !searchOpen && !isInputFocused(e)) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.code === "Escape" && searchOpen) {
        setSearchOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  const isInputFocused = (e) => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    const isInput = tag === "input" || tag === "textarea" || document.activeElement?.isContentEditable;
    const isSearchInput = searchInputRef.current && document.activeElement === searchInputRef.current;
    return isInput && !isSearchInput;
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => {
      if (!prev) {
        setQuery("");
      }
      return !prev;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      const updated = [trimmed, ...searchHistory.filter((item) => item !== trimmed)].slice(0, 10);
      saveSearchHistory(updated);
      navigate(`/products?keyword=${encodeURIComponent(trimmed)}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  const handleHistoryClick = (term) => {
    setQuery(term);
    navigate(`/products?keyword=${encodeURIComponent(term)}`);
    setSearchOpen(false);
    setQuery("");
  };

  const clearHistory = () => {
    saveSearchHistory([]);
  };

  const removeHistoryItem = (term, e) => {
    e.stopPropagation();
    const updated = searchHistory.filter((item) => item !== term);
    saveSearchHistory(updated);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src={logo}
              alt="Vaidarbhi Sarees"
              className="w-9 h-9 sm:w-12 sm:h-12 object-contain rounded-full"
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
          <div className="flex items-center gap-2 sm:gap-4 text-xl sm:text-2xl shrink-0">
            <div ref={searchRef} className="relative">
              <button
                onClick={toggleSearch}
                className="hover:text-[#8B1E3F] transition p-2 rounded-xl hover:bg-gray-100"
                aria-label="Search"
              >
                <FiSearch />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-3 w-screen max-w-none sm:max-w-[420px] md:max-w-[460px] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Search Input Area */}
                  <form onSubmit={handleSearch} className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-xl px-3 sm:px-4 py-3 sm:py-3 border border-gray-200 focus-within:border-[#8B1E3F] focus-within:bg-white focus-within:shadow-md transition-all">
                      <FiSearch className="text-gray-400 text-lg sm:text-lg shrink-0" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search sarees..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-base sm:text-base min-w-0"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => setQuery("")}
                          className="text-gray-400 hover:text-gray-600 transition p-1"
                        >
                          <FiX />
                        </button>
                      )}
                      <button
                        type="submit"
                        className="bg-[#8B1E3F] hover:bg-[#6f1732] text-white text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap"
                      >
                        Search
                      </button>
                    </div>
                  </form>

                  {/* Search History */}
                  {searchHistory.length > 0 && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <FiClock className="text-gray-400" />
                          Recent Searches
                        </div>
                        <button
                          onClick={clearHistory}
                          className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition"
                        >
                          <FiTrash2 />
                          Clear all
                        </button>
                      </div>

                      <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                        {searchHistory.map((term, index) => (
                          <button
                            key={`${term}-${index}`}
                            onClick={() => handleHistoryClick(term)}
                            className="w-full text-left px-3 sm:px-4 py-3 sm:py-2.5 rounded-xl hover:bg-gray-50 transition flex items-center justify-between group"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                              <FiClock className="text-gray-300 group-hover:text-[#8B1E3F] transition shrink-0" />
                              <span className="text-sm text-gray-700 truncate">{term}</span>
                            </div>
                            <button
                              onClick={(e) => removeHistoryItem(term, e)}
                              className="text-gray-300 hover:text-red-500 transition shrink-0 p-1"
                            >
                              <FiTrash2 />
                            </button>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!searchHistory.length && !query && (
                    <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                      <p className="text-xs text-gray-400 text-center py-3">
                        Your recent searches will appear here
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/wishlist" className="hover:text-[#8B1E3F] transition p-2 rounded-xl hover:bg-gray-100 hidden sm:flex" aria-label="Wishlist">
              <FiHeart />
            </Link>

            <Link to="/cart" className="hover:text-[#8B1E3F] transition p-2 rounded-xl hover:bg-gray-100 hidden sm:flex" aria-label="Cart">
              <FiShoppingCart />
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="hover:text-[#8B1E3F] transition flex items-center p-2 rounded-xl hover:bg-gray-100"
                  aria-label="User profile"
                >
                  <FiUser />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b bg-gray-50/80">
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
                       to="/mymessages"
                       onClick={() => setOpen(false)}
                       className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                     >
                       💬 My Messages
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
              <Link to="/login" className="hover:text-[#8B1E3F] transition p-2 rounded-xl hover:bg-gray-100" aria-label="Login">
                <FiUser />
              </Link>
            )}

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-2xl hover:text-[#8B1E3F] transition p-2 text-gray-700 focus:outline-none rounded-xl hover:bg-gray-100"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu (Centered) */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t py-4 flex flex-col items-center justify-center gap-4 text-center bg-white/90 backdrop-blur-xl">
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
