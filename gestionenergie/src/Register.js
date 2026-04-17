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
    <form onSubmit={handleRegister}>
      <input
        placeholder="Nom"
        onChange={(e) => setForm({ ...form, nom: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Mot de passe"
        onChange={(e) => setForm({ ...form, motdepasse: e.target.value })}
      />

      <button>Register</button>
    </form>
  );
}

export default Register;