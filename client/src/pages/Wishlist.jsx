import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data } = await API.get("/wishlist");
        const items = Array.isArray(data.items) ? data.items : [];
        setWishlist(items);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [user]);

  const removeItem = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((item) => item?.product?._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item from wishlist");
    }
  };

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="bg-[#FFF8F0] min-h-screen py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">My Wishlist</h1>
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-2xl font-semibold mb-5">Please login to view your wishlist</h2>
              <Link to="/login" className="inline-block bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">My Wishlist</h1>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center text-xl">Loading wishlist...</div>
          ) : wishlist.length === 0 ? (
            <div className="text-center bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-2xl font-semibold mb-5">Your wishlist is empty</h2>
              <Link to="/shop" className="inline-block bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => {
                const product = item?.product;

                if (!product || !product._id) {
                  return null;
                }

                return (
                  <div key={product._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-72 object-cover"
                    />

                    <div className="p-5">
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-[#8B1E3F] text-lg font-bold">
                          ₹{product.discountPrice || product.price}
                        </p>
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

                      <div className="flex gap-3 mt-5">
                        <Link to={`/product/${product.slug}`} className="flex-1 text-center bg-[#8B1E3F] text-white py-3 rounded-xl hover:bg-[#6f1732]">
                          View Details
                        </Link>
                        <button onClick={() => removeItem(product._id)} className="px-4 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
