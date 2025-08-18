// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:8080";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      if (!formData.email.match(/^[a-zA-Z0-9_]+$/)) {
        newErrors.email = "Enter a valid email or username";
      }
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setErrors({});

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.data));
          console.log("Login successful:", data.data);

          navigate("/chatbot");
        } else {
          setErrors({ server: data.message });
        }
      } catch (err) {
        setErrors({ server: "Failed to connect to server. Please try again." });
        console.error("Login error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#071952] via-[#0B666A] to-[#35A29F]">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-6 pt-20">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-10">
            <h2
              className="text-3xl font-extrabold text-center mb-6"
              style={{ color: "#071952" }}
            >
              Welcome Back
            </h2>
            <p
              className="text-center text-sm mb-8"
              style={{ color: "#0B666A" }}
            >
              Sign in to access your account
            </p>

            {errors.server && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
                {errors.server}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#071952" }}
                >
                  Email or Username
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-500" : "border-[#0B666A]"
                  } focus:outline-none focus:ring-4 focus:ring-[#97FEED] transition`}
                  placeholder="your@email.com or username"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#071952" }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.password ? "border-red-500" : "border-[#0B666A]"
                  } focus:outline-none focus:ring-4 focus:ring-[#97FEED] transition`}
                  placeholder="••••••••"
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0B666A] to-[#97FEED] hover:from-[#071952] hover:to-[#0B666A] text-white font-semibold py-3 rounded-xl shadow-md transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <p
              className="text-center mt-6 text-sm"
              style={{ color: "#0B666A" }}
            >
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[#071952] font-medium hover:underline"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
