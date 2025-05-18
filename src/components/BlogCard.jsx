import React from "react";

const BlogCard = ({ blog, onEdit, onDelete }) => {
  return (
    <div className="card mb-3">
      {blog.image && (
        <img src={blog.image} className="card-img-top" alt={blog.title} />
      )}
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {blog.category} | by {blog.author}
        </h6>
        <p className="card-text">{blog.content.substring(0, 120)}...</p>
        {onEdit && (
          <>
            <button
              className="btn btn-sm btn-primary me-2"
              onClick={() => onEdit(blog)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onDelete(blog._id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
