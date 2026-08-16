import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="flex justify-between items-center mb-10">

            <div>
              <h1 className="text-4xl font-bold text-[#8B1E3F]">
                All Orders
              </h1>

              <p className="text-gray-600 mt-2">
                Manage and track all customer orders.
              </p>
            </div>

            <button
              onClick={() => navigate("/admin")}
              className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]"
            >
              ← Back to Dashboard
            </button>

          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4 text-left">
                    Order ID
                  </th>

                  <th>Customer</th>

                  <th>Total</th>

                  <th>Payment</th>

                  <th>Status</th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="text-center py-10"
                    >
                      No Orders Found
                    </td>

                  </tr>

                ) : (

                  orders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 font-semibold">
                        {order._id}
                      </td>

                      <td>
                        {order.user?.name || "-"}
                      </td>

                      <td>
                        ₹{order.totalAmount}
                      </td>

                      <td>
                        <span className="capitalize text-sm">
                          {order.paymentMethod === "razorpay"
                            ? "Online / Razorpay"
                            : order.paymentMethod === "cod"
                            ? "COD"
                            : order.paymentMethod || "-"}
                        </span>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs ${
                            order.paymentStatus === "paid"
                              ? "bg-green-500"
                              : order.paymentStatus === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            order.orderStatus === "placed"
                              ? "bg-blue-500"
                              : order.orderStatus === "pending"
                              ? "bg-yellow-500"
                              : order.orderStatus === "processing"
                              ? "bg-orange-500"
                              : order.orderStatus === "shipped"
                              ? "bg-purple-500"
                              : order.orderStatus === "out for delivery"
                              ? "bg-indigo-500"
                              : order.orderStatus === "delivered"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>

                      <td className="text-center">

                        <button
                          onClick={() =>
                            navigate(`/admin/orders/${order._id}`)
                          }
                          className="bg-[#8B1E3F] text-white px-4 py-2 rounded-lg hover:bg-[#6f1732]"
                        >
                          View Details
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default AdminOrders;
