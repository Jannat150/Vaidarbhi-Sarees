import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/axios";
import { useAuth } from "../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
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

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await API.post("/users/login", {
        email,
        password,
      });

      console.log("Login success:", data);
      login(data);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      const backendMessage = error.response?.data?.message;
      const networkMessage =
        error.code === "ERR_NETWORK"
          ? "Backend is unreachable. Check your backend URL or start the server."
          : null;

      setError(backendMessage || networkMessage || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-5">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center font-bold text-[#8B1E3F]">
          Vaidarbhi Sarees
        </h1>

        <p className="text-center mt-2 text-gray-500">Welcome Back</p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 mt-8">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full border p-3 rounded-xl"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-[#8B1E3F] text-white py-3 rounded-xl"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have account?
          <Link to="/register" className="text-[#8B1E3F] ml-2 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;