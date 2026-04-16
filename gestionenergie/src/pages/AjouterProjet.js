import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import API_URL from "../config/api";

export default function AjouterProjet() {
  const [mode, setMode] = useState("manuel"); // "manuel" ou "qr"

  const [form, setForm] = useState({
    nom: "",
    description: "",
    imageFile: null,
    moniteurIP: "",
  });

  const navigate = useNavigate();

  // 🔥 Scan QR
  const handleScan = (result) => {
    if (result) {
      try {
        const data = JSON.parse(result?.text);

        setForm({
          nom: data.nom || "",
          description: data.description || "",
          moniteurIP: data.ip || "",
          imageFile: null,
        });

        setMode("manuel"); // revenir au formulaire rempli
      } catch {
        alert("QR invalide ❌");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nom", form.nom);
      formData.append("description", form.description);
      formData.append("moniteurIP", form.moniteurIP);
      if (form.imageFile) formData.append("image", form.imageFile);

      const res = await fetch(`${API_URL}/projets`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur ajout");

      alert("Projet ajouté !");
      navigate("/dashboard");

    } catch (err) {
      alert("Erreur ajout projet");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un projet</h2>

      {/* 🔥 CHOIX MODE */}
      <div className="mb-3">
        <button
          className={`btn me-2 ${mode === "manuel" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setMode("manuel")}
        >
          ✍️ Manuel
        </button>

        <button
          className={`btn ${mode === "qr" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setMode("qr")}
        >
          📷 QR Code
        </button>
      </div>

      {/* 🔥 MODE QR */}
      {mode === "qr" && (
        <div style={{ maxWidth: "300px" }}>
          <p>Scanner le QR Code du projet</p>
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={(result) => handleScan(result)}
          />
        </div>
      )}

      {/* 🔥 MODE MANUEL */}
      {mode === "manuel" && (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2" style={{ maxWidth: "400px" }}>
          
          <input
            className="form-control"
            placeholder="Nom du projet"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            required
          />

          <textarea
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <input
            className="form-control"
            placeholder="IP du moniteur"
            value={form.moniteurIP}
            onChange={(e) => setForm({ ...form, moniteurIP: e.target.value })}
            required
          />

          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
          />

          <button className="btn btn-success">
            Ajouter projet
          </button>
        </form>
      )}
    </div>
  );
}