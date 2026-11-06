import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// Get all blogs
export const getBlogs = () => {
  return API.get("/blogs");
};

// Get single blog
export const getBlog = (id) => {
  return API.get(`/blogs/${id}`);
};

// Add blog
export const addBlog = (blog) => {
  return API.post("/blogs", blog);
};

// Update blog
export const updateBlog = (id, blog) => {
  return API.put(`/blogs/${id}`, blog);
};

// Delete blog
export const deleteBlog = (id) => {
  return API.delete(`/blogs/${id}`);
};

export default API;