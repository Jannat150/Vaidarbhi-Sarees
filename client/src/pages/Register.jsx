import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";
import { useAuth } from "../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z][A-Za-z\s'.-]{2,49}$/;
const phoneRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const password = form.password;

    if (!name || !email || !phone || !password) {
      setError("All fields are required.");
      return;
    }

    if (!nameRegex.test(name)) {
      setError("Enter a valid full name with at least 3 letters.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters and include both letters and numbers.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await API.post("/users/register", {
        name,
        email,
        phone,
        password,
      });

      login(data);
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
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

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            autoComplete="name"
            minLength={3}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            inputMode="numeric"
            maxLength={10}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#8B1E3F] text-white py-3 rounded-xl hover:bg-[#6f1732]"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-[#8B1E3F] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;