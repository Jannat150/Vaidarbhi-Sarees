import { useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import API from "../services/axios";

const ProductCard = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const addToWishlist = async () => {
    try {
      setLoading(true);
      await API.post("/wishlist", { productId: product._id });
      alert("Added to wishlist");
    } catch (err) {
      console.error(err);
      alert("Failed to add to wishlist");
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
            <span className="line-through text-gray-400">
              ₹{product.price}
            </span>
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

          <button
            onClick={addToWishlist}
            disabled={loading}
            className="border border-[#8B1E3F] p-3 rounded-full disabled:opacity-60 hover:bg-[#8B1E3F] hover:text-white transition"
          >
            <FiHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;