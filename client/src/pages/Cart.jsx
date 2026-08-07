import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(items);
  }, []);

  const updateQuantity = (id, action) => {
    const updated = cart.map((item) => {
      if (item._id === id) {
        const qty =
          action === "inc"
            ? item.quantity + 1
            : Math.max(1, item.quantity - 1);

        return {
          ...item,
          quantity: qty,
        };
      }

      return item;
    });

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item._id !== id);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (item.discountPrice || item.price) *
        item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-10">
            Shopping Cart
          </h1>

          {cart.length === 0 ? (
            <div className="text-center bg-white rounded-2xl shadow-lg p-10">

              <h2 className="text-2xl font-semibold mb-5">
                Your Cart is Empty
              </h2>

              <Link
                to="/shop"
                className="inline-block bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]"
              >
                Continue Shopping
              </Link>

            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">

              {/* Cart Items */}

              <div className="lg:col-span-2 space-y-6">

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-md p-5 flex gap-5"
                  >

                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-32 h-40 object-cover rounded-xl"
                    />

                    <div className="flex-1">

                      <h2 className="text-2xl font-semibold">
                        {item.name}
                      </h2>

                      <p className="text-[#8B1E3F] text-xl font-bold mt-2">
                        ₹{item.discountPrice || item.price}
                      </p>

                      <div className="flex items-center gap-4 mt-5">

                        <button
                          onClick={() =>
                            updateQuantity(item._id, "dec")
                          }
                          className="w-10 h-10 border rounded-lg text-xl"
                        >
                          -
                        </button>

                        <span className="text-lg font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item._id, "inc")
                          }
                          className="w-10 h-10 border rounded-lg text-xl"
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          removeItem(item._id)
                        }
                        className="mt-5 text-red-600 font-medium hover:underline"
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ))}

              </div>

              {/* Order Summary */}

              <div className="bg-white rounded-2xl shadow-md p-6 h-fit">

                <h2 className="text-2xl font-bold mb-6 text-[#8B1E3F]">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4">
                  <span>Total Products</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between text-2xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-8 bg-[#8B1E3F] text-white py-3 rounded-xl hover:bg-[#6f1732]"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/shop")}
                  className="w-full mt-4 border-2 border-[#8B1E3F] text-[#8B1E3F] py-3 rounded-xl hover:bg-[#8B1E3F] hover:text-white transition"
                >
                  Add More Products
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Cart;