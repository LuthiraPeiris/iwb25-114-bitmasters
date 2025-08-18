import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUp from "./pages/SignUp";
import SampleHome from "./pages/Samplehome";
import Chatbot from "./pages/Chatbot";
import CommunityForum from "./pages/CommunityForum";
import PostDetail from "./pages/PostDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="sample" element={<SampleHome />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="community" element={<CommunityForum />} />
          <Route path="forum/post/:postId" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
