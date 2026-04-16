import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/lumen";

function Login() {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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

      // option: sauvegarde user
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "380px" }}>

        <h2 className="text-center text-success mb-2"><b>LUMEN</b></h2>
        <p className="text-center text-muted">Connexion</p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              value={motdepasse}
              onChange={(e) => setMotdepasse(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <hr />

        <button
          className="btn btn-success w-100"
          onClick={() => navigate("/register")}
        >
          Créer un compte
        </button>

      </div>
    </div>
  );
}

export default Login;