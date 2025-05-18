import { Link, useNavigate } from "react-router-dom";
import { getToken, removeToken } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = getToken();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient fixed-top">
      <div className="container">
        <Link className="navbar-brand px-3 py-1 rounded bg-primary text-white fw-bold" to="/">
           BlogZone
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {isAuth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-hover" to="/allblogs">All Blogs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-hover" to="/create">Create</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-hover" to="/myblogs">My Blogs</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-3" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-hover" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-hover" to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
