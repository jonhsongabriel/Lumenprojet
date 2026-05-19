import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";

function MainLayout({ children }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <Header />

      {/* MOBILE TOP BAR */}
      <div className="d-md-none bg-dark p-2 text-white d-flex justify-content-between align-items-center">
        <span className="fw-bold">⚡ Lumen</span>

        <button
          className="btn btn-warning btn-sm"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* OVERLAY MOBILE */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 999,
          }}
        />
      )}

      <div className="d-flex">

        {/* SIDEBAR */}
        <div
          className={`
            bg-dark text-white p-3
            ${open ? "d-block" : "d-none d-md-block"}
          `}
          style={{
            width: "260px",
            minHeight: "100vh",
            position: "relative",
            zIndex: 1000,
            overflowY: "auto",
          }}
        >
          
          <ul className="nav flex-column">

            <li className="mb-2">
              <Link
                onClick={() => setOpen(false)}
                className={`d-block py-2 px-2 rounded ${
                  isActive("/dashboard")
                    ? "bg-warning text-dark"
                    : "text-white"
                }`}
                to="/dashboard"
              >
                📊 <span className="ms-2">Dashboard</span>
              </Link>
            </li>

            <li className="mb-2">
              <Link
                onClick={() => setOpen(false)}
                className={`d-block py-2 px-2 rounded ${
                  isActive("/projets")
                    ? "bg-warning text-dark"
                    : "text-white"
                }`}
                to="/projets"
              >
                📁 <span className="ms-2">Projets</span>
              </Link>
            </li>

            <li className="mb-2">
              <Link
                onClick={() => setOpen(false)}
                className={`d-block py-2 px-2 rounded ${
                  isActive("/ajouterprojet")
                    ? "bg-warning text-dark"
                    : "text-white"
                }`}
                to="/ajouterprojet"
              >
                ➕ <span className="ms-2">Ajouter projet</span>
              </Link>
            </li>

            <li className="mb-2">
              <Link
                onClick={() => setOpen(false)}
                className={`d-block py-2 px-2 rounded ${
                  isActive("/journal")
                    ? "bg-warning text-dark"
                    : "text-white"
                }`}
                to="/journal"
              >
                📜 <span className="ms-2">Journal</span>
              </Link>
            </li>

            {/* PLAN PAGE (NEW) */}
            <li className="mb-2">
              <Link
                onClick={() => setOpen(false)}
                className={`d-block py-2 px-2 rounded ${
                  isActive("/plan")
                    ? "bg-warning text-dark"
                    : "text-white"
                }`}
                to="/plan"
              >
                📍 <span className="ms-2">Plan</span>
              </Link>
            </li>

            <hr className="text-secondary" />

            <li className="small text-muted px-2">
              <Link
                onClick={() => setOpen(false)}
                className={`d-block py-2 px-2 rounded ${
                  isActive("/rapport")
                    ? "bg-warning text-dark"
                    : "text-white"
                }`}
                to="/journal"
              >
                📜 <span className="ms-2">📊 Rapports disponibles</span>
              </Link>
              
            </li>

          </ul>
        </div>

        {/* CONTENT */}
        <div className="flex-grow-1 bg-light w-100">
          <main
            style={{
              minHeight: "80vh",
              padding: "20px",
            }}
          >
            {children}
          </main>
        </div>

      </div>

      <Footer />
    </>
  );
}

export default MainLayout;