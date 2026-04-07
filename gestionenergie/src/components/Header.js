import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Lumen Platform</Link>

      {token && (
        <>
          <Link className="btn btn-outline-light me-2" to="/">Dashboard</Link>

          {(role === "admin" || role === "ingenieur" || role === "technicien") && (
            <Link className="btn btn-outline-light me-2" to="/projets">
              Projets
            </Link>
          )}

          <Link className="btn btn-outline-light me-2" to="/demandes">
            Demandes
          </Link>

          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Header;