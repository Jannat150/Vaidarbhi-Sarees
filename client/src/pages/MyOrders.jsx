import { useEffect, useState } from "react";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirm) return;

    try {
      await API.put(`/orders/${id}/cancel`);

      alert("Order cancelled successfully");

      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to cancel order");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center text-2xl">
          Loading...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-10">
        <div className="max-w-6xl mx-auto px-6">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-10">
            My Orders
          </h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              <h2 className="text-2xl font-semibold">
                No Orders Yet
              </h2>

              <p className="text-gray-500 mt-3">
                Start shopping to place your first order.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg p-6 mb-8"
              >
                {/* Header */}

                <div className="flex flex-wrap justify-between gap-5 border-b pb-5">

                  <div>
                    <p className="font-semibold">
                      Order ID
                    </p>

                    <p className="text-gray-600 text-sm">
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">
                      Ordered On
                    </p>

                    <p>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold">
                      Payment
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.paymentStatus === "paid"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>

                  <div>
                    <p className="font-semibold">
                      Status
                    </p>

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.orderStatus === "placed"
                          ? "bg-blue-500"
                          : order.orderStatus === "processing"
                          ? "bg-orange-500"
                          : order.orderStatus === "shipped"
                          ? "bg-purple-500"
                          : order.orderStatus === "delivered"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>

                  <div>
                    <p className="font-semibold">
                      Total
                    </p>

                    <p className="text-xl font-bold text-[#8B1E3F]">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                </div>

                {/* Products */}

                <div className="mt-6">

                  <h2 className="font-bold text-xl mb-5">
                    Products
                  </h2>

                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border rounded-xl p-4 mb-4"
                    >
                      <div className="flex items-center gap-5">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />

                        <div>
                          <h3 className="font-bold">
                            {item.name}
                          </h3>

                          <p className="text-gray-500">
                            Quantity : {item.quantity}
                          </p>

                          <p className="text-[#8B1E3F] font-semibold">
                            ₹{item.price}
                          </p>
                        </div>

                      </div>

                      <div className="font-bold text-lg">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}

                </div>

                {/* Shipping */}

                <div className="mt-8 border-t pt-6">

                  <h2 className="font-bold text-xl mb-4">
                    Shipping Address
                  </h2>

                  <div className="text-gray-700 space-y-1">

                    <p>{order.shippingAddress.name}</p>

                    <p>{order.shippingAddress.address}</p>

                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}
                    </p>

                    <p>{order.shippingAddress.pincode}</p>

                    <p>{order.shippingAddress.phone}</p>

                  </div>

                </div>

                {/* Cancel */}

                {order.orderStatus === "placed" && (
                  <button
                    onClick={() => cancelOrder(order._id)}
                    className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl"
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MyOrders;