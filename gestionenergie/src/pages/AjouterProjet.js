import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AjouterProjet() {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    imageFile: null,
    moniteurIP: "", // adresse du moniteur
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("description", form.description);
    formData.append("moniteurIP", form.moniteurIP); // on envoie l'IP
    if (form.imageFile) formData.append("image", form.imageFile);

    try {
      const res = await fetch("http://localhost:5000/api/projets", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Projet ajouté :", data);

      // Après ajout → revenir au dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Erreur ajout projet :", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ajouter un projet</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
      >
        <input
          type="text"
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
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
