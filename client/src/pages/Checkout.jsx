import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "online",
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
        setUserProfile(data);

        const address =
          data.addresses?.find((a) => a.isDefault) || data.addresses?.[0];

        setForm({
          name: data.name || "",
          phone: address?.phone || data.phone || "",
          address: address?.line1 || "",
          city: address?.city || "",
          state: address?.state || "",
          pincode: address?.pincode || "",
          paymentMethod: "online",
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
    (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  const placeOrder = async (e) => {
    if (e) e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill in all shipping details");
      return;
    }

    try {
      setLoading(true);

      // Save address if user profile doesn't have addresses
      if (!userProfile?.addresses || userProfile.addresses.length === 0) {
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

      const orderItems = cart.map((item) => ({
        product: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.discountPrice || item.price,
        image: item.images?.[0] || "",
      }));

      const shippingAddress = {
        line1: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        phone: form.phone,
      };

      if (form.paymentMethod === "online") {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          alert("Failed to load Razorpay SDK. Check your internet connection.");
          setLoading(false);
          return;
        }

        // 1. Create Razorpay order on backend
        const { data } = await API.post("/orders/razorpay", {
          amount: total,
        });

        if (!data.success) {
          alert("Failed to initialize Razorpay payment.");
          setLoading(false);
          return;
        }

        // 2. Open Razorpay Checkout Modal
        const options = {
          key: data.key || "rzp_test_TOlIEQbQgjeJzf",
          amount: data.order.amount,
          currency: data.order.currency,
          name: "Vaidarbhi Sarees",
          description: "Order Payment",
          order_id: data.order.id,
          handler: async function (response) {
            try {
              setLoading(true);

              // 3. Verify Payment on Backend
              const verifyPayload = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items: orderItems,
                shippingAddress,
                totalAmount: total,
              };

              await API.post("/orders/verify", verifyPayload);

              localStorage.removeItem("cart");
              alert("Payment Successful! Order placed successfully.");
              navigate("/myorders");
            } catch (verifyErr) {
              console.error(verifyErr);
              alert(
                verifyErr.response?.data?.message ||
                  "Payment verification failed"
              );
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: form.name,
            email: userProfile?.email || "",
            contact: form.phone,
          },
          theme: {
            color: "#8B1E3F",
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (response) {
          alert(response.error?.description || "Payment Failed");
          setLoading(false);
        });
        rzp.open();
      } else {
        // Cash on Delivery
        const orderData = {
          items: orderItems,
          shippingAddress,
          paymentMethod: "cod",
          totalAmount: total,
        };

        await API.post("/orders", orderData);

        localStorage.removeItem("cart");
        alert("Order Placed Successfully");
        navigate("/myorders");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order Failed");
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="bg-[#FFF8F0] min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-10">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Shipping Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

              <form onSubmit={placeOrder} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street Address, House No."
                    rows="3"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full border p-3 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="w-full border p-3 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    className="w-full border p-3 rounded-xl"
                    required
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="pt-2">
                  <label className="block mb-2 font-semibold text-gray-800">
                    Payment Method
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label
                      className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                        form.paymentMethod === "online"
                          ? "border-[#8B1E3F] bg-[#8B1E3F]/5 font-semibold text-[#8B1E3F]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={form.paymentMethod === "online"}
                        onChange={handleChange}
                        className="accent-[#8B1E3F] w-4 h-4"
                      />
                      <div>
                        <p className="text-sm font-bold">Online Payment</p>
                        <p className="text-xs text-gray-500">
                          Razorpay (UPI, Cards, NetBanking)
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
                        form.paymentMethod === "cod"
                          ? "border-[#8B1E3F] bg-[#8B1E3F]/5 font-semibold text-[#8B1E3F]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={form.paymentMethod === "cod"}
                        onChange={handleChange}
                        className="accent-[#8B1E3F] w-4 h-4"
                      />
                      <div>
                        <p className="text-sm font-bold">Cash on Delivery</p>
                        <p className="text-xs text-gray-500">Pay upon delivery</p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between border-b py-3 text-sm sm:text-base"
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">Qty : {item.quantity}</p>
                    </div>

                    <p className="font-medium">
                      ₹{(item.discountPrice || item.price) * item.quantity}
                    </p>
                  </div>
                ))}

                <div className="mt-6 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">FREE</span>
                  </div>

                  <div className="flex justify-between text-2xl font-bold border-t pt-4 text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={placeOrder}
                disabled={loading}
                className="w-full mt-8 bg-[#8B1E3F] text-white font-semibold py-4 rounded-xl hover:bg-[#6f1732] transition disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : form.paymentMethod === "online"
                  ? `Pay ₹${total} via Razorpay`
                  : "Place Order (COD)"}
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