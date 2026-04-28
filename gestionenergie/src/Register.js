import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "./config/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    email: "",
    motdepasse: "",
    role: "client",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur inscription");
      }

      alert("Compte créé");
      navigate("/login");

    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

      <form onSubmit={handleRegister} className="p-4 shadow rounded bg-white" style={{ width: "350px" }}>

        <h3 className="text-center mb-3">Register</h3>

        {/* NOM */}
        <input
          className="form-control mb-2"
          placeholder="Nom"
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />

        {/* EMAIL */}
        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PASSWORD */}
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Mot de passe"
          onChange={(e) => setForm({ ...form, motdepasse: e.target.value })}
        />

        {/* ROLE (AJOUTÉ) */}
        <select
          className="form-control mb-3"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="client">Client</option>
          <option value="admin">Admin</option>
          <option value="technicien">Technicien</option>
        </select>

        {/* BUTTON */}
        <button className="btn btn-success w-100">
          Register
        </button>

        {/* LINK LOGIN */}
        <div className="text-center mt-3">
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Déjà un compte ? Login
          </span>
        </div>

      </form>
    </div>
  );
}

export default Register;