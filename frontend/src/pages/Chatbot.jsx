// src/pages/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import chatbotIcon from "../assets/chatbot.png";

const API_URL = "http://localhost:8080";

export default function Chatbot() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: `Hello${
          user ? ` ${user.username}` : ""
        }! I'm your AI assistant. How can I help you today?`,
        sender: "bot",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = message;
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          sessionId: sessionId,
          userId: user?.id || "anonymous",
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (!sessionId) {
          setSessionId(data.data.sessionId);
        }

        const botMessage = {
          id: data.data.botMessage.id,
          text: data.data.botMessage.text,
          sender: "bot",
          timestamp: data.data.botMessage.timestamp,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.message || "Unknown error");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "Sorry, I encountered an error. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col">
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src={chatbotIcon} alt="AI Icon" className="w-11 h-11" />
            <h1 className="text-2xl font-bold">AI Assistant</h1>
          </div>
          {user && (
            <span className="text-sm text-gray-300">
              Welcome, {user.username}!
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => navigate("/community")}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            Community Forum
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-xs md:max-w-md px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                <span>AI is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="bg-gray-800 p-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
          disabled={loading}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
