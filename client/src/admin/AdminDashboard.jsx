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

  useEffect(() => {
    fetchUsers();
    fetchStats();
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

        </div>

      </div>

      <Footer />
    </>
  );
};

export default AdminDashboard;