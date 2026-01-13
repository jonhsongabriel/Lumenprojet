import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AjouterProjet() {
  const [form, setForm] = useState({
    nom: "",
    description: "",
    imageFile: null,
    centrale: "",
    onduleur: "",
    batterie: "",
    datalog: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("description", form.description);
    formData.append("centrale", form.centrale);
    formData.append("onduleur", form.onduleur);
    formData.append("batterie", form.batterie);
    formData.append("datalog", form.datalog);
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
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input type="text" placeholder="Nom" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <input type="text" placeholder="Centrale" value={form.centrale} onChange={e => setForm({ ...form, centrale: e.target.value })} />
        <input type="text" placeholder="Onduleur" value={form.onduleur} onChange={e => setForm({ ...form, onduleur: e.target.value })} />
        <input type="text" placeholder="Batterie" value={form.batterie} onChange={e => setForm({ ...form, batterie: e.target.value })} />
        <input type="text" placeholder="Datalog" value={form.datalog} onChange={e => setForm({ ...form, datalog: e.target.value })} />
        <input type="file" accept="image/*" onChange={e => setForm({ ...form, imageFile: e.target.files[0] })} />
        <button type="submit">Ajouter le projet</button>
      </form>
    </div>
  );
}
