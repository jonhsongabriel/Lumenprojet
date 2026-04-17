import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export default function AjouterProjet() {
  const [mode, setMode] = useState("manuel");

  const [form, setForm] = useState({
    nom: "",
    description: "",
    ip: "",
    client: "",
    imageFile: null,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("nom", form.nom);
      formData.append("description", form.description);
      formData.append("ip", form.ip);
      formData.append("client", form.client);
      formData.append("modeConnexion", mode);

      if (form.imageFile) {
        formData.append("image", form.imageFile);
      }

      const res = await fetch(`${API_URL}/projets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur ajout projet");

      alert("Projet ajouté avec succès !");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>

      <div className="card shadow p-4 w-100" style={{ maxWidth: "550px", borderRadius: "15px" }}>

        <h3 className="text-center mb-4">➕ Ajouter un projet</h3>

        {/* MODE */}
        <div className="d-flex justify-content-center mb-3 gap-2">
          <button
            className={`btn btn-sm ${mode === "manuel" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setMode("manuel")}
            type="button"
          >
            ✍️ Manuel
          </button>

          <button className="btn btn-sm btn-outline-secondary" disabled>
            📷 QR (bientôt)
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">

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
            value={form.ip}
            onChange={(e) => setForm({ ...form, ip: e.target.value })}
            required
          />

          <input
            className="form-control"
            placeholder="Client (optionnel)"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
          />

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, imageFile: e.target.files[0] })
            }
          />

          <button className="btn btn-success mt-2 w-100">
            🚀 Ajouter projet
          </button>

        </form>

      </div>

    </div>
  );
}