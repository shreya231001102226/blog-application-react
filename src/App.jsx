import { useEffect, useState } from "react";

import {
  getBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
} from "./services/api";

import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // READ: Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBlogs();

      setBlogs(response.data);
    } catch (err) {
      setError(
        "Failed to load blogs. Please check whether JSON Server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // CREATE: Add new blog
  const handleAddBlog = async (blog) => {
    try {
      setError("");

      const newBlog = {
        ...blog,
        createdAt: new Date().toISOString().slice(0, 10),
      };

      const response = await addBlog(newBlog);

      setBlogs((prev) => [response.data, ...prev]);
      setEditingBlog(null);

      alert("Blog published successfully!");
    } catch (err) {
      setError("Failed to add blog. Please try again.");
    }
  };

  // UPDATE: Edit existing blog
  const handleUpdateBlog = async (blog) => {
    try {
      setError("");

      const updatedBlog = {
        ...blog,
        createdAt: editingBlog.createdAt,
      };

      const response = await updateBlog(
        editingBlog.id,
        updatedBlog
      );

      setBlogs((prev) =>
        prev.map((b) =>
          b.id === editingBlog.id ? response.data : b
        )
      );

      setEditingBlog(null);

      alert("Blog updated successfully!");
    } catch (err) {
      setError("Failed to update blog. Please try again.");
    }
  };

  // DELETE: Remove blog
  const handleDeleteBlog = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await deleteBlog(id);

      setBlogs((prev) =>
        prev.filter((blog) => blog.id !== id)
      );

      if (selectedBlog?.id === id) {
        setSelectedBlog(null);
      }

      if (editingBlog?.id === id) {
        setEditingBlog(null);
      }

      alert("Blog deleted successfully!");
    } catch (err) {
      setError("Failed to delete blog. Please try again.");
    }
  };

  // Search blogs
  const filteredBlogs = blogs.filter((blog) => {
    const keyword = search.toLowerCase();

    return (
      blog.title.toLowerCase().includes(keyword) ||
      blog.author.toLowerCase().includes(keyword) ||
      blog.content.toLowerCase().includes(keyword)
    );
  });

  // Handle form submission
  const handleSubmit = async (blog) => {
    if (editingBlog) {
      await handleUpdateBlog(blog);
    } else {
      await handleAddBlog(blog);
    }
  };

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <h1>📝 My Blog Application</h1>
        <p>Write, Share and Explore Blogs</p>
      </header>

      <main className="container">

        {/* Error message */}
        {error && (
          <div className="error-box">
            {error}

            <button onClick={fetchBlogs}>
              Retry
            </button>
          </div>
        )}

        {/* Blog Form */}
        <BlogForm
          onSubmit={handleSubmit}
          editingBlog={editingBlog}
          onCancel={() => setEditingBlog(null)}
        />

        {/* Search */}
        <div className="search-section">
          <h2>Explore Blogs</h2>

          <input
            type="text"
            placeholder="Search by title, author or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading blogs...</p>
          </div>
        ) : (
          <>
            <p className="blog-count">
              {filteredBlogs.length} blog(s) found
            </p>

            <BlogList
              blogs={filteredBlogs}
              onEdit={setEditingBlog}
              onDelete={handleDeleteBlog}
              onView={setSelectedBlog}
            />
          </>
        )}

      </main>

      {/* Blog Details */}
      {selectedBlog && (
        <BlogDetails
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}

      <footer>
        <p>Blog Application © 2026 | React + Axios + JSON Server</p>
      </footer>

    </div>
  );
}

export default App;