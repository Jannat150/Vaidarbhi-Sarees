import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

useEffect(() => {
  const loadData = async () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];

    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    setCart(items);

    try {
      const { data } = await API.get("/users/profile");

      const address = data.addresses?.find(a => a.isDefault) || data.addresses?.[0];

      setForm({
        name: data.name || "",
        phone: address?.phone || data.phone || "",
        address: address?.line1 || "",
        city: address?.city || "",
        state: address?.state || "",
        pincode: address?.pincode || "",
        paymentMethod: "cod",
      });
    } catch (err) {
      console.log(err);
    }
  };

  loadData();
}, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (item.discountPrice || item.price) * item.quantity,
    0
  );

  const shipping = subtotal > 999 ? 0 : 99;

  const total = subtotal + shipping;

const placeOrder = async () => {
  try {
    setLoading(true);

    // Get latest profile
    const { data: user } = await API.get("/users/profile");

    // If user has no saved address, save it
    if (!user.addresses || user.addresses.length === 0) {
      await API.post("/users/addresses", {
        label: "Home",
        line1: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        phone: form.phone,
        isDefault: true,
      });
    }

    const orderData = {
      items: cart.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.discountPrice || item.price,
        image: item.images?.[0] || "",
      })),

      shippingAddress: {
        line1: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        phone: form.phone,
      },

      paymentMethod: "cod",
      totalAmount: total,
    };

    await API.post("/orders", orderData);

    localStorage.removeItem("cart");

    alert("Order Placed Successfully");

    navigate("/");
  } catch (err) {
    console.log(err);

    alert(err.response?.data?.message || "Order Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-10">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Shipping Details */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Shipping Details
              </h2>

              <div className="space-y-4">

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address"
                  rows="3"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <input
                  type="text"
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  className="w-full border p-3 rounded-xl"
                  required
                />

                <div>
                  <label className="block mb-2 font-semibold">
                    Payment Method
                  </label>

                  <input
                    type="text"
                    value="Cash on Delivery"
                    disabled
                    className="w-full border p-3 rounded-xl bg-gray-100"
                  />
                </div>

              </div>

            </div>

            {/* Order Summary */}

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Order Summary
              </h2>

              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between border-b py-3"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-gray-500">
                      Qty : {item.quantity}
                    </p>
                  </div>

                  <p>
                    ₹
                    {(item.discountPrice || item.price) *
                      item.quantity}
                  </p>
                </div>
              ))}

              <div className="mt-6 space-y-3">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className="w-full mt-8 bg-[#8B1E3F] text-white py-4 rounded-xl hover:bg-[#6f1732]"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
};

export default Checkout;