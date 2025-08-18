import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080";

export default function CommunityForum() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/forum/posts`);
      const data = await response.json();

      if (data.success && Array.isArray(data.data)) {
        setPosts(data.data);
      } else {
        console.error("Invalid data structure or failed request:", data);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    setCreating(true);
    try {
      const tagsArray = newPost.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const response = await fetch(`${API_URL}/forum/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          authorId: user?.id || "anonymous",
          authorUsername: user?.username || "Anonymous",
          tags: tagsArray,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewPost({ title: "", content: "", tags: "" });
        setShowCreatePost(false);
        fetchPosts();
        alert("Post created successfully!");
      } else {
        alert("Failed to create post: " + data.message);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/forum/post/${postId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
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
          <p>Loading forum posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-gray-800 p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Community Forum</h1>
          {user && (
            <span className="text-sm text-gray-300">
              Welcome, {user.username}!
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/chatbot")}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors"
          >
            Back to Chat
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 border border-cyan-600 hover:bg-cyan-600/10 rounded-lg font-semibold transition-colors"
          >
            Home
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowCreatePost(!showCreatePost)}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            {showCreatePost ? "Cancel" : "Create New Post"}
          </button>
        </div>

        {showCreatePost && (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Post</h2>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="Enter post title..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Content
                </label>
                <textarea
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                  rows={6}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white resize-none"
                  placeholder="Write your post content..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) =>
                    setNewPost({ ...newPost, tags: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="e.g., ai, tips, discussion"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  {creating ? "Creating..." : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreatePost(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No posts yet. Be the first to create one!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handlePostClick(post.id)}
                className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-6 hover:bg-gray-800/70 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {post.isPinned && (
                      <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                    )}
                    {post.title}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {formatDate(post.createdAt)}
                  </span>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-2">
                  {post.content && post.content.length > 150
                    ? post.content.substring(0, 150) + "..."
                    : post.content}
                </p>

                {post.tags &&
                  Array.isArray(post.tags) &&
                  post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-600/30 text-purple-300 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                <div className="flex justify-between text-gray-400 text-sm">
                  <span>By {post.authorUsername || "Unknown"}</span>
                  <span>{post.replyCount || 0} replies</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
