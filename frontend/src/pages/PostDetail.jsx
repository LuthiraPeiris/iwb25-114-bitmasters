import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "http://localhost:8080";

export default function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [newReply, setNewReply] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/forum/posts/${postId}`);
      const data = await response.json();

      if (data.success) {
        setPostData(data.data);
      } else {
        console.error("Failed to fetch post:", data.message);
        alert("Post not found");
        navigate("/community");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("Failed to load post");
      navigate("/community");
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!newReply.trim()) {
      alert("Please enter a reply");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/forum/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
          content: newReply,
          authorId: user?.id || "anonymous",
          authorUsername: user?.username || "Anonymous",
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewReply("");
        setShowReplyForm(false);
        fetchPostDetails();
        alert("Reply added successfully!");
      } else {
        alert("Failed to add reply: " + data.message);
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      alert("Failed to add reply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  if (!postData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Post not found</p>
          <button
            onClick={() => navigate("/community")}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
          >
            Back to Forum
          </button>
        </div>
      </div>
    );
  }

  const { post, replies } = postData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/community")}
            className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center"
          >
            ← Back to Forum
          </button>
          <h1 className="text-xl font-bold">Post Details</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/chatbot")}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors text-sm"
          >
            Chat
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-cyan-600 hover:bg-cyan-600/10 rounded-lg font-semibold transition-colors text-sm"
          >
            Home
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">
              {post.isPinned && (
                <span className="inline-block w-5 h-5 bg-yellow-500 rounded-full mr-3"></span>
              )}
              {post.title}
            </h1>
            <span className="text-sm text-gray-400">
              {formatDate(post.createdAt)}
            </span>
          </div>

          <div className="mb-4">
            <p className="text-gray-300 whitespace-pre-wrap">{post.content}</p>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600/30 text-purple-300 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center text-gray-400 text-sm border-t border-gray-700 pt-4">
            <span>By {post.authorUsername}</span>
            <span>{replies ? replies.length : 0} replies</span>
          </div>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
          >
            {showReplyForm ? "Cancel Reply" : "💬 Add Reply"}
          </button>
        </div>

        {showReplyForm && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Add Your Reply</h3>
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div>
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white resize-none"
                  placeholder="Write your reply..."
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {submitting ? "Posting..." : "Post Reply"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Replies ({replies ? replies.length : 0})
          </h2>

          {!replies || replies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">
                No replies yet. Be the first to reply!
              </p>
            </div>
          ) : (
            replies.map((reply, index) => (
              <div
                key={reply.id}
                className="bg-gray-800/30 backdrop-blur-lg rounded-lg p-4 border-l-4 border-cyan-500"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-cyan-400">
                      {reply.authorUsername}
                    </span>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {formatDate(reply.createdAt)}
                  </span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">
                  {reply.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
