function BlogList({
  blogs,
  onEdit,
  onDelete,
  onView,
}) {
  if (blogs.length === 0) {
    return (
      <div className="empty">
        <h3>No blogs available</h3>
        <p>Create your first blog to get started!</p>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {blogs.map((blog) => (
        <div className="blog-card" key={blog.id}>

          {blog.image && (
            <img
              src={blog.image}
              alt={blog.title}
              className="blog-image"
            />
          )}

          <div className="blog-content">
            <h3>{blog.title}</h3>

            <p className="author">
              By {blog.author}
            </p>

            <p className="description">
              {blog.content.length > 150
                ? blog.content.substring(0, 150) + "..."
                : blog.content}
            </p>

            <p className="date">
              {blog.createdAt}
            </p>

            <div className="blog-actions">
              <button
                className="view-btn"
                onClick={() => onView(blog)}
              >
                View
              </button>

              <button
                className="edit-btn"
                onClick={() => onEdit(blog)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(blog.id)}
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default BlogList;