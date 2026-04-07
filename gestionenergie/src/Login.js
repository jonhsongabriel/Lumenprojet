import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost/api/lumen";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur login");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Connexion</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Se connecter
        </button>
      </form>

      {/* 🔥 LIEN INSCRIPTION */}
      <div className="mt-3 text-center">
        <span>Pas de compte ? </span>
        <Link to="/register">Créer un compte</Link>
      </div>
    </div>
  );
}

export default Login;