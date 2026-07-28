import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const { data } = await API.post("/users/register", form);

    login(data);

    alert("Registration Successful");

    navigate("/");
  } catch (error) {
    alert(error.response?.data?.message || "Registration Failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-5">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-[#8B1E3F]">
          Vaidarbhi Sarees
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create Your Account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-[#8B1E3F] text-white py-3 rounded-xl hover:bg-[#6f1732]"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#8B1E3F] font-semibold"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;