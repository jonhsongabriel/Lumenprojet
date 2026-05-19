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
    image: null,
    preview: null,
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm({
      ...form,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("nom", form.nom);
      formData.append("ipAddress", form.ipAddress);
      formData.append("port", form.port);
      formData.append("protocol", form.protocol);
      formData.append("serialNumber", form.serialNumber);
      formData.append("devicePassword", form.devicePassword);

      if (form.image) {
        formData.append("image", form.image);
      }

      const res = await fetch(`${API_URL}/projets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Connexion échouée");
      }

      alert("✅ Centrale ajoutée avec image !");
      navigate("/projets");

    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur connexion centrale");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>

      <div className="card shadow p-4 w-100" style={{ maxWidth: "500px", borderRadius: "15px" }}>

        <h3 className="text-center mb-4">
          ⚡ Ajouter une centrale solaire
        </h3>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

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
            placeholder="Serial Number"
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

          {/* IMAGE */}
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImage}
          />

          {form.preview && (
            <img
              src={form.preview}
              alt="preview"
              style={{
                width: "100%",
                borderRadius: "10px",
                marginTop: "10px",
                objectFit: "cover"
              }}
            />
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Connexion..." : "🔌 Tester et connecter"}
          </button>

        </form>

      </div>

    </div>
  );
}