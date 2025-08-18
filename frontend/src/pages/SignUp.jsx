// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:8080";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
        const response = await fetch(`${API_URL}/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.data));
          console.log("Registration successful:", data.data);
          navigate("/chatbot");
        } else {
          setErrors({ server: data.message });
        }
      } catch (err) {
        setErrors({ server: "Failed to connect to server. Please try again." });
        console.error("Signup error:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const checkUsernameAvailability = async () => {
    if (formData.username.trim()) {
      try {
        const response = await fetch(
          `${API_URL}/checkUsername?username=${formData.username}`
        );
        const data = await response.json();
        if (!data.success) {
          setErrors({ ...errors, username: data.message });
        }
      } catch (err) {
        console.error("Username check error:", err);
      }
    }
  };

  const checkEmailAvailability = async () => {
    if (formData.email && /\S+@\S+\.\S+/.test(formData.email)) {
      try {
        const response = await fetch(
          `${API_URL}/checkEmail?email=${formData.email}`
        );
        const data = await response.json();
        if (!data.success) {
          setErrors({ ...errors, email: data.message });
        }
      } catch (err) {
        console.error("Email check error:", err);
      }
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
              Create Account
            </h2>

            {errors.server && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
                {errors.server}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#071952" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={checkUsernameAvailability}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.username ? "border-red-500" : "border-[#0B666A]"
                  } focus:outline-none focus:ring-4 focus:ring-[#97FEED] transition`}
                  placeholder="Choose a username"
                  disabled={loading}
                />
                {errors.username && (
                  <p className="text-sm text-red-600 mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#071952" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={checkEmailAvailability}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-500" : "border-[#0B666A]"
                  } focus:outline-none focus:ring-4 focus:ring-[#97FEED] transition`}
                  placeholder="Enter your email"
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
                  placeholder="Create a password"
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#071952" }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#0B666A]"
                  } focus:outline-none focus:ring-4 focus:ring-[#97FEED] transition`}
                  placeholder="Confirm your password"
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#071952] hover:bg-[#0B666A] text-white font-bold rounded-xl transition duration-300 focus:outline-none focus:ring-4 focus:ring-[#97FEED] disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-medium text-[#0B666A] hover:text-[#071952] focus:outline-none focus:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
