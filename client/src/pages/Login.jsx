import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import API from "../services/axios";
import { useAuth } from "../context/AuthContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [emailForm, setEmailForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmailForm({
      ...emailForm,
      [e.target.name]: e.target.value,
    });
    if (error) setError("");
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = emailForm.email.trim().toLowerCase();
    const password = emailForm.password;

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

      let data;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        const response = await API.post(
          "/users/firebase-auth",
          {},
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        data = response.data;
      } catch (fbErr) {
        console.warn("Firebase login failed, trying backend login:", fbErr);
        const response = await API.post("/users/login", {
          email,
          password,
        });
        data = response.data;
      }

      login(data);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      let msg = "Login Failed";
      if (err.response?.data?.message) {
        msg = err.response.data.message;
      } else if (err.code === "auth/invalid-api-key") {
        msg = "Invalid Firebase API Key.";
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        msg = "Invalid email or password.";
      } else if (err.code === "auth/too-many-requests") {
        msg = "Too many failed login attempts. Please try again later.";
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage("");

    if (!forgotEmail || !emailRegex.test(forgotEmail)) {
      setForgotMessage("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, forgotEmail);
      setForgotMessage("Password reset email sent! Please check your inbox.");
      setForgotEmail("");
    } catch (err) {
      let msg = "Failed to send reset email.";
      if (err.code === "auth/user-not-found") {
        msg = "No account found with this email.";
      } else if (err.code === "auth/invalid-api-key") {
        msg = "Invalid Firebase API Key.";
      } else if (err.message) {
        msg = err.message;
      }
      setForgotMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-5 py-10">
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

        {forgotMessage && (
          <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {forgotMessage}
          </div>
        )}

        {!showForgotPassword ? (
          <form onSubmit={handleEmailSubmit} className="space-y-5 mt-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={emailForm.email}
              onChange={handleEmailChange}
              autoComplete="email"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#8B1E3F]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={emailForm.password}
              onChange={handleEmailChange}
              autoComplete="current-password"
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#8B1E3F]"
            />

            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-[#8B1E3F] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#8B1E3F] hover:bg-[#6f1732] text-white py-3 rounded-xl font-medium transition cursor-pointer"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-5 mt-6">
            <p className="text-sm text-gray-600 text-center">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <input
              type="email"
              placeholder="Email"
              value={forgotEmail}
              onChange={(e) => {
                setForgotEmail(e.target.value);
                if (forgotMessage) setForgotMessage("");
              }}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:border-[#8B1E3F]"
            />

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#8B1E3F] hover:bg-[#6f1732] text-white py-3 rounded-xl font-medium transition cursor-pointer"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setForgotMessage("");
                setForgotEmail("");
              }}
              className="w-full text-gray-500 text-sm hover:underline cursor-pointer"
            >
              Back to Login
            </button>
          </form>
        )}

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#8B1E3F] ml-2 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
