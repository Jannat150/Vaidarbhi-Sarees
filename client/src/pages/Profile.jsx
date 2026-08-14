import { useEffect, useState } from "react";
import API from "../services/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const emptyAddress = {
  label: "Home",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
  isDefault: false,
};

const Profile = () => {
  const [user, setUser] = useState({
    addresses: [],
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const [addressForm, setAddressForm] = useState({ ...emptyAddress });
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [addressMessage, setAddressMessage] = useState("");

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

  const handleProfileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setProfileMessage("");
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setProfileMessage("");

    try {
      const { data } = await API.put("/users/profile", formData);

      setUser({
        ...user,
        ...data,
      });

      setEditingProfile(false);
      setFormData({
        ...data,
        password: "",
      });
      setProfileMessage("Profile updated successfully");
    } catch (err) {
      setProfileMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleAddressChange = (e) => {
    setAddressForm({
      ...addressForm,
      [e.target.name]: e.target.value,
    });
    setAddressMessage("");
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setAddressMessage("");

    if (!addressForm.line1 || !addressForm.city || !addressForm.state || !addressForm.pincode || !addressForm.phone) {
      setAddressMessage("Please fill all required fields");
      return;
    }

    try {
      setAddressLoading(true);

      if (editingAddressId) {
        const { data } = await API.put(`/users/addresses/${editingAddressId}`, addressForm);
        setUser({
          ...user,
          addresses: data,
        });
        setAddressMessage("Address updated successfully");
      } else {
        const { data } = await API.post("/users/addresses", addressForm);
        setUser({
          ...user,
          addresses: data,
        });
        setAddressMessage("Address added successfully");
      }

      setAddressForm({ ...emptyAddress });
      setEditingAddressId(null);
      setShowAddressForm(false);
    } catch (err) {
      setAddressMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleEditAddress = (address) => {
    setAddressForm({
      label: address.label || "Home",
      line1: address.line1 || "",
      line2: address.line2 || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      phone: address.phone || "",
      isDefault: address.isDefault || false,
    });
    setEditingAddressId(address._id);
    setShowAddressForm(true);
    setAddressMessage("");
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      const { data } = await API.delete(`/users/addresses/${addressId}`);
      setUser({
        ...user,
        addresses: data,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete address");
    }
  };

  const handleSetDefault = async (addressId) => {
    try {
      const { data } = await API.put(`/users/addresses/${addressId}/default`);
      setUser({
        ...user,
        addresses: data,
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to set default address");
    }
  };

  const cancelAddressForm = () => {
    setAddressForm({ ...emptyAddress });
    setEditingAddressId(null);
    setShowAddressForm(false);
    setAddressMessage("");
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
                onClick={() => {
                  setEditingProfile(!editingProfile);
                  setProfileMessage("");
                }}
                className="bg-[#8B1E3F] text-white px-5 py-2 rounded-xl"
              >
                {editingProfile ? "Cancel" : "Edit"}
              </button>

            </div>

            <form onSubmit={updateProfile} className="space-y-6">

              <div>
                <label>Name</label>

                <input
                  disabled={!editingProfile}
                  name="name"
                  value={formData.name}
                  onChange={handleProfileChange}
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
                  disabled={!editingProfile}
                  name="phone"
                  value={formData.phone}
                  onChange={handleProfileChange}
                  className="w-full border p-3 rounded-xl mt-2"
                />
              </div>

              {editingProfile && (
                <>
                  <div>
                    <label>New Password</label>

                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleProfileChange}
                      placeholder="Leave blank to keep current"
                      className="w-full border p-3 rounded-xl mt-2"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#C9A227] text-white px-8 py-3 rounded-xl"
                  >
                    Save Changes
                  </button>
                </>
              )}

              {profileMessage && (
                <p className={`text-sm ${profileMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                  {profileMessage}
                </p>
              )}

            </form>

          </div>

          {/* Addresses */}

          <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Saved Addresses
              </h2>

              {!showAddressForm && (
                <button
                  onClick={() => {
                    setShowAddressForm(true);
                    setEditingAddressId(null);
                    setAddressForm({ ...emptyAddress });
                    setAddressMessage("");
                  }}
                  className="bg-[#8B1E3F] text-white px-5 py-2 rounded-xl"
                >
                  + Add Address
                </button>
              )}
            </div>

            {addressMessage && (
              <p className={`text-sm mb-4 ${addressMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {addressMessage}
              </p>
            )}

            {showAddressForm && (
              <form onSubmit={handleAddressSubmit} className="border rounded-2xl p-6 mb-6 bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">
                  {editingAddressId ? "Edit Address" : "Add New Address"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Label</label>
                    <select
                      name="label"
                      value={addressForm.label}
                      onChange={handleAddressChange}
                      className="w-full border p-3 rounded-xl"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={addressForm.phone}
                      onChange={handleAddressChange}
                      className="w-full border p-3 rounded-xl"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address Line 1 *</label>
                    <input
                      type="text"
                      name="line1"
                      value={addressForm.line1}
                      onChange={handleAddressChange}
                      className="w-full border p-3 rounded-xl"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Address Line 2</label>
                    <input
                      type="text"
                      name="line2"
                      value={addressForm.line2}
                      onChange={handleAddressChange}
                      className="w-full border p-3 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressChange}
                      className="w-full border p-3 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressChange}
                      className="w-full border p-3 rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={addressForm.pincode}
                      onChange={handleAddressChange}
                      className="w-full border p-3 rounded-xl"
                      required
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={addressForm.isDefault}
                        onChange={(e) =>
                          setAddressForm({
                            ...addressForm,
                            isDefault: e.target.checked,
                          })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Set as default address</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={addressLoading}
                    className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl hover:bg-[#6f1732] transition disabled:opacity-50"
                  >
                    {addressLoading ? "Saving..." : editingAddressId ? "Update Address" : "Add Address"}
                  </button>

                  <button
                    type="button"
                    onClick={cancelAddressForm}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {user.addresses.length === 0 && !showAddressForm ? (
              <p className="text-gray-500">
                No Address Added
              </p>
            ) : (
              <div className="space-y-4">
                {user.addresses.map((addr) => (
                  <div
                    key={addr._id}
                    className="border rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">
                          {addr.label}
                        </h3>
                        {addr.isDefault && (
                          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            Default Address
                          </span>
                        )}
                      </div>

                      <p>{addr.line1}</p>

                      {addr.line2 && <p>{addr.line2}</p>}

                      <p>
                        {addr.city}, {addr.state}
                      </p>

                      <p>{addr.pincode}</p>

                      <p>Phone: {addr.phone}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {!addr.isDefault && (
                        <button
                          onClick={() => handleSetDefault(addr._id)}
                          className="border border-[#8B1E3F] text-[#8B1E3F] px-4 py-2 rounded-xl hover:bg-[#8B1E3F] hover:text-white transition text-sm"
                        >
                          Set Default
                        </button>
                      )}

                      <button
                        onClick={() => handleEditAddress(addr)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteAddress(addr._id)}
                        className="border border-red-500 text-red-600 px-4 py-2 rounded-xl hover:bg-red-50 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
