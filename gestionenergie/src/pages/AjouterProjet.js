// src/pages/AjouterProjet.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export default function AjouterProjet() {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    imageFile: null,
    moniteurIP: "",
  });

  const navigate = useNavigate();

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

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `Erreur HTTP ${res.status}`);
      }

      const data = await res.json();
      console.log("Projet ajouté :", data);

      alert("Projet ajouté avec succès !");
      navigate("/dashboard"); // redirection après ajout
    } catch (err) {
      console.error("Erreur ajout projet :", err);
      alert(
        "Impossible d'ajouter le projet. Vérifiez le backend, la connexion et le dossier public/images."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ajouter un projet</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Nom du projet"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          required
        />
        <textarea
          placeholder="Description du projet"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="IP du moniteur"
          value={form.moniteurIP}
          onChange={(e) => setForm({ ...form, moniteurIP: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
        />
        <button type="submit">Ajouter le projet</button>
      </form>
    </div>
  );
}