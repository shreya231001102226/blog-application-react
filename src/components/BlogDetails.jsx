function BlogDetails({ blog, onClose }) {
  if (!blog) return null;

  const getYouTubeEmbedUrl = (url) => {
    try {
      const parsed = new URL(url);

      if (
        parsed.hostname === "youtu.be" ||
        parsed.hostname === "www.youtu.be"
      ) {
        return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}`;
      }

      if (
        parsed.hostname === "youtube.com" ||
        parsed.hostname === "www.youtube.com" ||
        parsed.hostname === "m.youtube.com"
      ) {
        const id = parsed.searchParams.get("v");

        if (id && /^[\w-]{11}$/.test(id)) {
          return `https://www.youtube-nocookie.com/embed/${id}`;
        }
      }
    } catch {
      return "";
    }

    return "";
  };

  const videoUrl = blog.video
    ? getYouTubeEmbedUrl(blog.video)
    : "";

  return (
    <div className="modal-overlay">
      <div className="details-modal">

        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <h1>{blog.title}</h1>

        <p className="author">
          By {blog.author}
        </p>

        <p className="date">
          {blog.createdAt}
        </p>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="detail-image"
          />
        )}

        <div className="full-content">
          {blog.content}
        </div>

        {blog.video && (
          videoUrl ? (
            <iframe
              src={videoUrl}
              title="Blog video"
              width="100%"
              height="300"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <p>
              Invalid or unsupported YouTube video URL.
            </p>
          )
        )}

        <button className="cancel-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}

export default BlogDetails;