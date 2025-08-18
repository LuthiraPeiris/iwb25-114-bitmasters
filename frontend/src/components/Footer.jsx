// src/components/Footer.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">DeviceCare</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Your friendly tech helper for instant AI-driven device support and
              community-powered solutions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/chat")}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  AI Chat
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/forum")}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Community Forum
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:devicecare@gmail.com"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  devicecare@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+94908909905"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  +94 9089090905
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 DeviceCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
