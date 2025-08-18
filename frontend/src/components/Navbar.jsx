// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import navbarIconImage from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      isSection: location.pathname === "/",
    },
    {
      id: "aboutus",
      label: "About Us",
      path: "/#aboutus",
      isSection: location.pathname === "/",
    },
  ];

  const handleNavigation = (item) => {
    if (item.isSection && item.id === "aboutus") {
      const aboutUsSection = document.getElementById("aboutus");
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (item.id === "aboutus" && location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const aboutUsSection = document.getElementById("aboutus");
        if (aboutUsSection) {
          aboutUsSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else if (item.id === "home" && location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(item.path);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-sm py-2 shadow-lg"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center space-x-3 text-white font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={navbarIconImage}
              alt="DeviceCare Logo"
              className="w-8 h-8 object-contain"
            />
            <span>DeviceCare</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="text-gray-300 hover:text-cyan-300 font-medium transition-colors"
                onClick={() => handleNavigation(item)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-gray-300 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg">
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="px-6 py-3 text-left font-medium text-gray-300 hover:bg-gray-800 transition-colors"
                onClick={() => handleNavigation(item)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
