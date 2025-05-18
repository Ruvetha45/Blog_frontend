import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(formData);
    if (res.ok) {
      alert("Signup successful!");
      navigate("/login");
    } else {
      const error = await res.json();
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center text-primary mb-4">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Name</label>
            <input
              id="name"
              className="form-control"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email</label>
            <input
              id="email"
              className="form-control"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              id="password"
              className="form-control"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100 mt-2" type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
