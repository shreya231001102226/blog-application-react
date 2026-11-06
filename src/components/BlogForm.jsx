import { useEffect, useState } from "react";

function BlogForm({ onSubmit, editingBlog, onCancel }) {
  const initialForm = {
    title: "",
    author: "",
    content: "",
    image: "",
    video: "",
  };

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingBlog) {
      setForm({
        title: editingBlog.title || "",
        author: editingBlog.author || "",
        content: editingBlog.content || "",
        image: editingBlog.image || "",
        video: editingBlog.video || "",
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [editingBlog]);

  // Count words
  const wordCount = form.content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "content") {
      const count = value.trim()
        .split(/\s+/)
        .filter(Boolean).length;

      if (count > 1000) {
        setError("Maximum 1000 words allowed!");
        return;
      }
    }

    setForm({
      ...form,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim() ||
        !form.content.trim()) {
      setError("Please fill all required fields.");
      return;
    }

    if (wordCount > 1000) {
      setError("Blog content cannot exceed 1000 words.");
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      author: form.author.trim(),
      content: form.content.trim(),
    });

    setForm(initialForm);
    setError("");
  };

  return (
    <div className="form-card">
      <h2>{editingBlog ? "Edit Blog" : "Create New Blog"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Blog Title *</label>
        <input
          type="text"
          name="title"
          placeholder="Enter blog title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <label>Author Name *</label>
        <input
          type="text"
          name="author"
          placeholder="Enter author name"
          value={form.author}
          onChange={handleChange}
          required
        />

        <label>Blog Content *</label>
        <textarea
          name="content"
          placeholder="Write your blog here..."
          value={form.content}
          onChange={handleChange}
          rows="7"
          required
        />

        <div className="word-count">
          {wordCount}/1000 words
        </div>

        <label>Image URL (Optional)</label>
        <input
          type="url"
          name="image"
          placeholder="https://example.com/image.jpg"
          value={form.image}
          onChange={handleChange}
        />

        <label>Video URL (Optional)</label>
        <input
          type="url"
          name="video"
          placeholder="YouTube video URL"
          value={form.video}
          onChange={handleChange}
        />

        {error && <p className="error">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="save-btn">
            {editingBlog ? "Update Blog" : "Publish Blog"}
          </button>

          {editingBlog && (
            <button
              type="button"
              className="cancel-btn"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BlogForm;