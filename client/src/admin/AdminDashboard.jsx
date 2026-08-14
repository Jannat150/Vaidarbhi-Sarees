import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrders: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchStats();
    fetchRecentOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStats = async () => {
  console.log("Fetching stats...");

  try {
    const { data } = await API.get("/orders/stats");
    console.log("Stats Response:", data);
    setStats(data);
  } catch (err) {
    console.log("Stats Error:", err.response || err);
  }
  };

  const fetchRecentOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setRecentOrders(data.slice(0, 10));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-10 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="flex justify-between items-center mb-10">

            <div>
              <h1 className="text-4xl font-bold text-[#8B1E3F]">
                Admin Dashboard
              </h1>

              <p className="text-gray-600 mt-2">
                Welcome to Vaidarbhi Sarees Admin Panel
              </p>
            </div>

            <button
              onClick={() => navigate("/admin/add-product")}
              className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732]"
            >
              + Add Product
            </button>

          </div>

          {/* Stats */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500 text-lg">
                Customers
              </h3>

              <p className="text-4xl font-bold text-[#8B1E3F] mt-3">
                {users.length}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500 text-lg">
                Orders
              </h3>

              <p className="text-4xl font-bold text-[#8B1E3F] mt-3">
                {stats.totalOrders}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500 text-lg">
                New Orders
              </h3>

              <p className="text-4xl font-bold text-orange-500 mt-3">
                {stats.newOrders}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-gray-500 text-lg">
                Revenue
              </h3>

              <p className="text-3xl font-bold text-green-600 mt-3">
                ₹{stats.totalRevenue}
              </p>
            </div>

          </div>

          {/* Quick Actions */}

          <h2 className="text-2xl font-bold text-[#8B1E3F] mb-5">
            Quick Actions
          </h2>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">

            <div
              onClick={() => navigate("/admin/products/add")}
              className="cursor-pointer bg-[#8B1E3F] text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
            >
              <h2 className="text-2xl font-bold">
                ➕ Add Product
              </h2>

              <p className="mt-4">
                Add new sarees to your store.
              </p>
            </div>

             <div
               onClick={() => navigate("/admin/contacts")}
               className="cursor-pointer bg-orange-600 text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
             >
               <h2 className="text-2xl font-bold">
                 💬 Messages
               </h2>

               <p className="mt-4">
                 View and reply to customer messages.
               </p>
             </div>

             <div
               onClick={() => navigate("/admin/products")}
               className="cursor-pointer bg-[#C9A227] text-white rounded-2xl p-8 shadow-lg hover:scale-105 transition"
             >
               <h2 className="text-2xl font-bold">
                 🛍 Manage Products
               </h2>

               <p className="mt-4">
                 Edit or delete products.
               </p>
             </div>


          </div>

          {/* Customers */}

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

            <div className="bg-[#8B1E3F] text-white px-6 py-4">

              <h2 className="text-2xl font-bold">
                Registered Customers
              </h2>

            </div>

            <table className="w-full">

              <thead className="bg-gray-100">

                <tr>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Role</th>

                  <th className="text-center">
                    Orders
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (

                  <tr>

                    <td
                      colSpan={5}
                      className="text-center py-10"
                    >
                      No Users Found
                    </td>

                  </tr>

                ) : (

                  users.map((user) => (

                    <tr
                      key={user._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 font-semibold">
                        {user.name}
                      </td>

                      <td>{user.email}</td>

                      <td>{user.phone || "-"}</td>

                      <td>

                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>

                      <td className="text-center">

                        <button
                          onClick={() =>
                            navigate(`/admin/users/${user._id}`)
                          }
                          className="bg-[#8B1E3F] text-white px-4 py-2 rounded-lg hover:bg-[#6f1732]"
                        >
                          View Orders
                        </button>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

          {/* Recent Orders */}

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mt-12">

            <div className="bg-[#8B1E3F] text-white px-6 py-4 flex justify-between items-center">

              <h2 className="text-2xl font-bold">
                Recent Orders
              </h2>

              <button
                onClick={() => navigate("/admin/orders")}
                className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition"
              >
                View All
              </button>

            </div>

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

                {recentOrders.length === 0 ? (

                  <tr>

                    <td
                      colSpan={6}
                      className="text-center py-10"
                    >
                      No Orders Found
                    </td>

                  </tr>

                ) : (

                  recentOrders.map((order) => (

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

export default AdminDashboard;