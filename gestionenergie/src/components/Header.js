import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const canSeeProjets = ["admin", "ingenieur", "technicien"].includes(role);
  const canSeeDemandes = ["admin", "ingenieur"].includes(role);

  return (
    <nav className="navbar navbar-dark bg-dark px-3 flex-wrap">

      {/* LOGO */}
      <div className="mb-2">
        <Link to="/dashboard">
          <img
            src="/images/logo-lumen-vert.png"
            alt="logo"
            style={{ height: "55px", cursor: "pointer" }}
          />
        </Link>
      </div>

      {token && (
        <div className="d-flex flex-wrap gap-2 align-items-center">

          <Link className="btn btn-outline-light btn-sm" to="/dashboard">
            Dashboard
          </Link>

          {canSeeProjets && (
         
         <Link className="btn btn-outline-light btn-sm" to="/projets">
              Projets
            </Link>
          )}

          {canSeeDemandes && (
            <Link className="btn btn-outline-light btn-sm" to="/demandes">
              Demandes
            </Link>
          )}

          <button className="btn btn-danger btn-sm" onClick={logout}>
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}

export default Header;