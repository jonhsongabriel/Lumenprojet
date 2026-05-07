import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export default function ConnecterMoniteur() {
  const [form, setForm] = useState({
    serialNumber: "",
    devicePassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/connect-device`,  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Connexion échouée");

      alert("✅ Moniteur connecté !");
      
      // 👉 redirection vers formulaire projet
      navigate(`/ajouter-projet?deviceId=${data.deviceId}`);

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: "400px", borderRadius: "15px" }}>

        <h3 className="text-center mb-4">🔐 Connecter un moniteur</h3>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

          <input
            className="form-control"
            placeholder="Numéro de série / ID"
            value={form.serialNumber}
            onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
            required
          />

          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            value={form.devicePassword}
            onChange={(e) => setForm({ ...form, devicePassword: e.target.value })}
            required
          />

          <button className="btn btn-primary w-100">
            🔌 Se connecter
          </button>

        </form>

      </div>
    </div>
  );
}