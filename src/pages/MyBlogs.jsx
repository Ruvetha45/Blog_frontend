import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await fetch("https://blog-backend-01vx.onrender.com/blogs/myblogs", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setMyBlogs(data);
      } catch (error) {
        console.error("Error fetching my blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, [token]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const response = await fetch(`https://blog-backend-01vx.onrender.com/blogs/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        setMyBlogs(myBlogs.filter(blog => blog._id !== id));
        alert("Blog deleted successfully!");
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog.");
      }
    }
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <h2 className="mb-4 text-center text-primary">My Blogs</h2>
      {myBlogs.length === 0 ? (
        <p className="text-center">You haven't written any blogs yet.</p>
      ) : (
        <div className="row">
          {myBlogs.map((blog) => (
            <div className="col-md-6 col-lg-4" key={blog._id}>
              <div className="card mb-4 shadow-sm border-0">
                {blog.image && (
                  <img
                    src={blog.image}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">
                    {blog.content.length > 100
                      ? blog.content.slice(0, 100) + "..."
                      : blog.content}
                  </p>
                  <p className="text-muted mb-1">
                    <small>Category: {blog.category}</small>
                  </p>
                  <p className="text-muted mb-3">
                    <small>Author: {blog.author ? blog.author : 'unknown'}</small>
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(blog._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
