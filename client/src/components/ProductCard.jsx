import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import API from "../services/axios";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const { user } = useAuth();

  const addToWishlist = async () => {
    try {
      setLoading(true);
      const { data } = await API.post("/wishlist", { productId: product._id });
      setWishlisted(true);
      setTimeout(() => setWishlisted(false), 2000);
      alert("Added to wishlist");
    } catch (err) {
      console.error("Add to wishlist error:", err);
      const message = err.response?.data?.message || "Failed to add to wishlist";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      <div className="overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="h-96 w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">
          {product.name}
        </h3>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-2xl font-bold text-[#8B1E3F]">
            ₹{product.discountPrice || product.price}
          </span>

          {product.discountPrice && (
            <>
              <span className="line-through text-gray-400">
                ₹{product.price}
              </span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </span>
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Link
            to={`/product/${product.slug}`}
            className="bg-[#8B1E3F] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#6f1732]"
          >
            <FiShoppingCart />
            Cart
          </Link>

          {user ? (
            <button
              type="button"
              onClick={addToWishlist}
              disabled={loading}
              className={`border p-3 rounded-full transition ${
                wishlisted
                  ? "bg-[#8B1E3F] text-white border-[#8B1E3F]"
                  : "border-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white"
              } disabled:opacity-60`}
            >
              <FiHeart />
            </button>
          ) : (
            <Link
              to="/login"
              className="border border-[#8B1E3F] p-3 rounded-full hover:bg-[#8B1E3F] hover:text-white transition"
            >
              <FiHeart />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;