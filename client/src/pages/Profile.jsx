import { useEffect, useState } from "react";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const [user, setUser] = useState({
    addresses: [],
  });

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/profile");

      setUser({
        ...data,
        addresses: data.addresses || [],
      });

      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      const { data } = await API.put("/users/profile", formData);

      setUser({
        ...user,
        ...data,
      });

      setEditing(false);

      alert("Profile Updated Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-20">
        Loading...
      </h1>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FFF8F0] py-16">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold text-[#8B1E3F] mb-10">
            My Profile
          </h1>

          {/* Profile */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-2xl font-semibold">
                Personal Information
              </h2>

              <button
                onClick={() => setEditing(!editing)}
                className="bg-[#8B1E3F] text-white px-5 py-2 rounded-xl"
              >
                {editing ? "Cancel" : "Edit"}
              </button>

            </div>

            <div className="space-y-6">

              <div>
                <label>Name</label>

                <input
                  disabled={!editing}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl mt-2"
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  disabled
                  value={user.email || ""}
                  className="w-full border p-3 rounded-xl mt-2 bg-gray-100"
                />
              </div>

              <div>
                <label>Phone</label>

                <input
                  disabled={!editing}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border p-3 rounded-xl mt-2"
                />
              </div>

              {editing && (
                <>
                  <div>
                    <label>New Password</label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border p-3 rounded-xl mt-2"
                    />
                  </div>

                  <button
                    onClick={updateProfile}
                    className="bg-[#C9A227] text-white px-8 py-3 rounded-xl"
                  >
                    Save Changes
                  </button>
                </>
              )}

            </div>

          </div>

          {/* Addresses */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-semibold mb-6">
              Saved Addresses
            </h2>

            {user.addresses.length === 0 ? (
              <p className="text-gray-500">
                No Address Added
              </p>
            ) : (
              user.addresses.map((addr, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-5 mb-5"
                >
                  <h3 className="font-semibold text-lg">
                    {addr.label}
                  </h3>

                  <p>{addr.line1}</p>

                  {addr.line2 && <p>{addr.line2}</p>}

                  <p>
                    {addr.city}, {addr.state}
                  </p>

                  <p>{addr.pincode}</p>

                  <p>{addr.phone}</p>

                  {addr.isDefault && (
                    <span className="inline-block mt-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Default Address
                    </span>
                  )}

                </div>
              ))
            )}

            <button className="mt-5 bg-[#8B1E3F] text-white px-6 py-3 rounded-xl">
              + Add Address
            </button>

          </div>

          {/* Orders */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-semibold mb-6">
              My Orders
            </h2>

            {orders.length === 0 ? (

              <p className="text-gray-500">
                No Orders Yet
              </p>

            ) : (

              orders.map((order) => (

                <div
                  key={order._id}
                  className="border rounded-2xl p-6 mb-8"
                >

                  <div className="flex flex-wrap justify-between mb-5">

                    <div>

                      <p className="font-bold">
                        Order ID
                      </p>

                      <p className="text-sm text-gray-500">
                        {order._id}
                      </p>

                    </div>

                    <div className="text-right">

                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span className="text-green-600">
                          {order.orderStatus}
                        </span>
                      </p>

                      <p>
                        <strong>Payment:</strong>{" "}
                        {order.paymentStatus}
                      </p>

                    </div>

                  </div>

                  <div className="space-y-4">

                    {order.items.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-5 border rounded-xl p-4"
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded-lg"
                        />

                        <div className="flex-1">

                          <h3 className="font-semibold">
                            {item.name}
                          </h3>

                          <p>
                            Qty : {item.quantity}
                          </p>

                          <p>
                            ₹{item.price}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                  <div className="text-right mt-5 text-xl font-bold text-[#8B1E3F]">
                    Total : ₹{order.totalAmount}
                  </div>

                </div>

              ))

            )}

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;