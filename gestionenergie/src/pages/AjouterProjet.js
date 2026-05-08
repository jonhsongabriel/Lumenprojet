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

      // ✅ IMPORTANT : backend attend serialNumber
      const payload = {
        serialNumber: form.serialNumber,
        devicePassword: form.devicePassword,
      };

      const res = await fetch(`${API_URL}/connect-device`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      // ✅ lecture sécurisée
      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("❌ Backend non JSON :", text);
        throw new Error("Réponse serveur invalide");
      }

      if (!res.ok) {
        throw new Error(data.message || "Connexion échouée");
      }

      alert("✅ Moniteur connecté !");

      navigate(`/ajouter-projet?deviceId=${data.deviceId}`);

    } catch (err) {

      console.error("❌ Connect device:", err);

      alert(err.message || "Erreur connexion");

    }
    console.log("API_URL =", API_URL);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow p-4 w-100"
        style={{
          maxWidth: "400px",
          borderRadius: "15px",
        }}
      >

        <h3 className="text-center mb-4">
          🔐 Connecter un moniteur
        </h3>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3"
        >

          <input
            type="text"
            className="form-control"
            placeholder="Numéro de série / ID"
            value={form.serialNumber}
            onChange={(e) =>
              setForm({
                ...form,
                serialNumber: e.target.value,
              })
            }
            required
          />

          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            value={form.devicePassword}
            onChange={(e) =>
              setForm({
                ...form,
                devicePassword: e.target.value,
              })
            }
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            🔌 Se connecter
          </button>

        </form>

      </div>
    </div>
  );
}