import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [location]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/blogs" />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/blogs" />} />
        <Route path="/" element={token ? <Blogs /> : <Navigate to="/login" />} />
        <Route path="/blogs" element={token ? <Blogs /> : <Navigate to="/login" />} />
        <Route path="/create" element={token ? <CreateBlog /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={token ? <EditBlog /> : <Navigate to="/login" />} />
        <Route path="/myblogs" element={token ? <MyBlogs /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/blogs" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
