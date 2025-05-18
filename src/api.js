const backendUrl = process.env.REACT_APP_BACKEND_URL;


// Signup
export async function signup(formData) {
  const res = await fetch(`${backendUrl}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res;
}

// Login
export async function login(formData) {
  const res = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res;
}

// Get all blogs (optionally with filters)
export async function getBlogs(filters = {}) {
  const { category, author } = filters;
  let url = `${backendUrl}/blogs`;

  // build query string
  const query = [];
  if (category) query.push(`category=${encodeURIComponent(category)}`);
  if (author) query.push(`author=${encodeURIComponent(author)}`);
  if (query.length) url += `?${query.join("&")}`;

  const token = localStorage.getItem("token");
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

// Create a new blog
export async function createBlog(blogData) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${backendUrl}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });
  return res;
}

// Get a single blog by id
export async function getBlogById(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${backendUrl}/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

// Update a blog by id
export async function updateBlog(id, blogData) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${backendUrl}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blogData),
  });
  return res;
}

// Delete a blog by id
export async function deleteBlog(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${backendUrl}/blogs/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

// Get blogs 
export async function getMyBlogs() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${backendUrl}/blogs/myblogs`, {  // assuming you have this route
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
}

console.log("Backend URL:", backendUrl);

