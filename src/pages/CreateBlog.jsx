import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../api";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
    author: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createBlog(formData);
    if (res.ok) {
      alert("Blog created successfully");
      navigate("/blogs");
    } else {
      alert("Failed to create blog");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "80px", maxWidth: "600px" }}>
      <div className="card shadow-lg border-primary">
        <div className="card-body">
          <h2 className="text-center mb-4 text-primary">Create New Blog</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="form-control my-2"
              name="title"
              placeholder="Blog Title"
              onChange={handleChange}
              required
            />
            <input
              className="form-control my-2"
              name="category"
              placeholder="Category (e.g., Tech, Food)"
              onChange={handleChange}
              required
            />
            <input
              className="form-control my-2"
              name="author"
              placeholder="Author Name"
              onChange={handleChange}
              required
            />
            <textarea
              className="form-control my-2"
              name="content"
              placeholder="Write your blog content here..."
              rows="6"
              onChange={handleChange}
              required
            />
            <input
              className="form-control my-2"
              name="image"
              placeholder="Image URL (optional)"
              onChange={handleChange}
            />
            <button className="btn btn-primary w-100 mt-3" type="submit">
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
