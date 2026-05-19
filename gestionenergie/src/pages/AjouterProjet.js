import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export default function ConnecterMoniteur() {

  const [form, setForm] = useState({
    nom: "",
    ipAddress: "",
    port: "80",
    protocol: "http",
    serialNumber: "",
    devicePassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const payload = {
        nom: form.nom,
        ipAddress: form.ipAddress,
        port: form.port,
        protocol: form.protocol,
        serialNumber: form.serialNumber,
        devicePassword: form.devicePassword,
      };

      const res = await fetch(`${API_URL}/test-device`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Connexion échouée");
      }

      alert("✅ Centrale connectée avec succès");

      navigate("/projets");

    } catch (err) {

      console.error(err);

      alert(err.message || "Erreur connexion centrale");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >

      <div
        className="card shadow p-4 w-100"
        style={{
          maxWidth: "500px",
          borderRadius: "15px",
        }}
      >

        <h3 className="text-center mb-4">
          ⚡ Ajouter une centrale solaire
        </h3>

        <form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3"
        >

          <input
            type="text"
            name="nom"
            className="form-control"
            placeholder="Nom de la centrale"
            value={form.nom}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="ipAddress"
            className="form-control"
            placeholder="Adresse IP locale"
            value={form.ipAddress}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="port"
            className="form-control"
            placeholder="Port"
            value={form.port}
            onChange={handleChange}
          />

          <select
            name="protocol"
            className="form-control"
            value={form.protocol}
            onChange={handleChange}
          >
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
          </select>

          <input
            type="text"
            name="serialNumber"
            className="form-control"
            placeholder="Serial Number (optionnel)"
            value={form.serialNumber}
            onChange={handleChange}
          />

          <input
            type="password"
            name="devicePassword"
            className="form-control"
            placeholder="Mot de passe device"
            value={form.devicePassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Connexion..."
              : "🔌 Tester et connecter"}
          </button>

        </form>

      </div>

    </div>
  );
}