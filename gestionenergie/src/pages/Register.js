import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    motdepasse: "",
    role: "client",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/lumen/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Compte créé");
    window.location.href = "/login";
  };

  return (
    <div className="container mt-5">
      <h2>Créer compte</h2>
      <form onSubmit={handleRegister}>
        <input className="form-control mb-2" placeholder="Nom"
          onChange={(e) => setForm({...form, nom: e.target.value})} />

        <input className="form-control mb-2" placeholder="Email"
          onChange={(e) => setForm({...form, email: e.target.value})} />

        <input className="form-control mb-2" placeholder="Mot de passe"
          type="password"
          onChange={(e) => setForm({...form, motdepasse: e.target.value})} />

        <select className="form-control mb-2"
          onChange={(e) => setForm({...form, role: e.target.value})}>
          <option value="admin">Admin</option>
          <option value="ingenieur">Ingénieur</option>
          <option value="technicien">Technicien</option>
          <option value="client">Client</option>
        </select>

        <button className="btn btn-dark">Créer compte</button>
      </form>
    </div>
  );
}

export default Register;