import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("http://localhost:5000/blogs", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const data = await res.json();
      console.log("Blogs from backend:", data);
      if (res.ok) {
        setBlogs(data);
      } else {
        alert(data.message || "Failed to load blogs");
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <h2 className="mb-4 text-center text-primary">All Blogs</h2>
      {blogs.length ? (
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100 border-primary">
                <div className="card-body">
                  <h4 className="card-title text-dark">{blog.title}</h4>
                  <p className="card-text text-muted" style={{ maxHeight: "120px", overflow: "hidden" }}>
                    {blog.content.slice(0, 150)}...
                  </p>
                  <hr />
                  <p className="text-end">
                    <small className="text-secondary">
                      By <strong>{blog.author ? blog.author : 'unkonown'}</strong>
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No blogs found.</p>
      )}
    </div>
  );
};

export default Blogs;
