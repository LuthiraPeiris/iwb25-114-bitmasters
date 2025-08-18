// src/pages/Homepage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import homepageImage from "../assets/Homepage.png";

export default function Homepage() {
  const navigate = useNavigate();
  const [showAboutUs, setShowAboutUs] = useState(false);

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById("aboutus");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-800 text-white">
      <Navbar />

      <div
        id="home"
        className="flex flex-col items-center justify-center min-h-screen px-6"
      >
        <div className="mb-8">
          <img
            src={homepageImage}
            alt="DeviceCare AI Assistant"
            className="w-48 h-48 mx-auto rounded-full shadow-2xl border border-gray-700 object-cover"
          />
        </div>

        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-cyan-400">DeviceCare</span>
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Experience the power of AI-driven conversations. Click below to get
            started with your personal AI assistant.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <div id="aboutus" className="scroll-mt-20">
        <AboutUs />
      </div>
      <Footer />
    </div>
  );
}
