import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "./config/api";

function Login() {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, motdepasse }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur connexion");
      }

      // 🔐 stockage sécurisé simple
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("nom", data.nom);

      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} style={{ width: "320px" }}>

        <h3 className="text-center mb-3">Login</h3>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <input
          className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Mot de passe"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Login"}
        </button>

        {/* 🔥 REGISTER LINK */}
        <div className="text-center mt-3">
          <p className="mb-0">
            Pas de compte ?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              S'inscrire
            </span>
          </p>
        </div>

      </form>
    </div>
  );
}

export default Login;