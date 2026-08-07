import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist");
      setWishlist(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeItem = async (productId) => {
    try {
      await API.delete(`/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error(err);
      alert("Failed to remove item from wishlist");
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-8">My Wishlist</h1>

          {loading ? (
            <div className="text-center text-xl">Loading wishlist...</div>
          ) : wishlist.length === 0 ? (
            <div className="text-center bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-2xl font-semibold mb-5">Your wishlist is empty</h2>
              <Link
                to="/shop"
                className="inline-block bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div key={item.product._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <img
                    src={item.product.images?.[0]}
                    alt={item.product.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="p-5">
                    <h2 className="text-xl font-semibold">{item.product.name}</h2>
                    <p className="text-[#8B1E3F] text-lg font-bold mt-2">
                      ₹{item.product.discountPrice || item.product.price}
                    </p>

                    <div className="flex gap-3 mt-5">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="flex-1 text-center bg-[#8B1E3F] text-white py-3 rounded-xl hover:bg-[#6f1732]"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="px-4 py-3 border border-red-500 text-red-500 rounded-xl hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Wishlist;
