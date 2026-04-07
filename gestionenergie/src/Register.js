import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost/api/lumen";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "client"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur");

      alert("Compte créé !");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Créer un compte</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="form-control mb-2"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="client">Client</option>
          <option value="technicien">Technicien</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-success w-100">
          Créer un compte
        </button>
      </form>
    </div>
  );
}

export default Register;