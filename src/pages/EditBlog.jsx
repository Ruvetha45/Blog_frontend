import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog } from "../api"; 

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlogById(id);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();

        setForm({
          title: data.title,
          category: data.category,
          content: data.content,
          image: data.image || "",
        });
      } catch (error) {
        console.error(error);
        alert("Error loading blog");
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateBlog(id, form);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Update failed");
      }

      alert("Blog updated successfully");
      navigate("/myblogs");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "80px", maxWidth: "700px" }}>
      <h2 className="mb-4 text-center text-primary">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label fw-bold">
            Category
          </label>
          <input
            type="text"
            id="category"
            className="form-control"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            placeholder="e.g. Travel, Technology"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label fw-bold">
            Content
          </label>
          <textarea
            id="content"
            className="form-control"
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            required
            placeholder="Write your blog content here..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="form-label fw-bold">
            Image URL <span className="text-muted">(optional)</span>
          </label>
          <input
            type="text"
            id="image"
            className="form-control"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button type="submit" className="btn btn-success w-100">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
