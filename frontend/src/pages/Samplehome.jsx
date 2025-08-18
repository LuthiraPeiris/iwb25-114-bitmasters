import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { SiWhatsapp } from "react-icons/si";
import { FaFacebookMessenger, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoIosMailUnread } from "react-icons/io";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Typewriter } from "react-simple-typewriter";

export default function SampleHome() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] via-[#16161A] to-[#1a1a25] text-[#FFFFFE] font-sans">
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-400">AI Web</h2>
        <ul className="flex space-x-6 text-sm md:text-base">
          {["Home", "About", "Features", "Contact"].map((sec) => (
            <li key={sec} className="hover:text-purple-400 cursor-pointer">
              {sec}
            </li>
          ))}
        </ul>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20 gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-tr from-purple-500 to-cyan-400 bg-clip-text text-transparent">
              <Typewriter
                words={[
                  "Heshan Deemantha",
                  "AI Web Developer",
                  "Tech Enthusiast",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={40}
                delaySpeed={1500}
              />
            </span>
          </h1>
          <p className="text-gray-300 max-w-md mb-6">
            Building next-level AI-powered web experiences with creativity &
            cutting-edge technology.
          </p>
          <button className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg text-white font-semibold flex items-center gap-2">
            Explore More <RiArrowRightDoubleLine size={24} />
          </button>
        </div>

        <motion.div
          className="flex-1 max-w-sm rounded-xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="AI tech illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {[
          {
            icon: <SiWhatsapp size={40} className="text-green-400" />,
            title: "Instant Messaging AI",
            description:
              "Engage your users with AI-powered chatbots for instant, intelligent communication.",
          },
          {
            icon: <FaGithub size={40} className="text-gray-400" />,
            title: "Code Automation",
            description:
              "Automate repetitive coding tasks and generate efficient, clean code using AI.",
          },
          {
            icon: <FaLinkedin size={40} className="text-blue-600" />,
            title: "Professional Networking",
            description:
              "Connect your AI applications seamlessly with professional networks for smarter integrations.",
          },
        ].map(({ icon, title, description }) => (
          <motion.div
            key={title}
            className="bg-[#22222a] rounded-xl p-6 shadow-lg hover:shadow-purple-500 transition-shadow cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-300">{description}</p>
          </motion.div>
        ))}
      </section>

      <section
        id="contact"
        className="max-w-7xl mx-auto px-6 py-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <div className="flex justify-center gap-8 text-3xl text-gray-400">
          <a
            href="mailto:heshan@example.com"
            aria-label="Email"
            className="hover:text-purple-500 transition-colors"
          >
            <IoIosMailUnread />
          </a>
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="hover:text-green-500 transition-colors"
          >
            <SiWhatsapp />
          </a>
          <a
            href="https://linkedin.com/in/heshandeemantha"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-600 transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/heshandeemantha"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-gray-300 transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://m.me/yourprofile"
            target="_blank"
            rel="noreferrer"
            aria-label="Messenger"
            className="hover:text-blue-400 transition-colors"
          >
            <FaFacebookMessenger />
          </a>
        </div>
      </section>

      {showScrollTop && (
        <motion.button
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 p-3 rounded-full shadow-lg text-white"
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          aria-label="Scroll to top"
        >
          <MdKeyboardDoubleArrowUp size={24} />
        </motion.button>
      )}
    </div>
  );
}
