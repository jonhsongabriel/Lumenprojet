import React, { useState } from "react";
import axios from "axios";

// URL dynamique selon environnement
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : ""; // prod via Nginx proxy

export default function Demande() {
  const [newDemande, setNewDemande] = useState({
    nomdemader: "",
    emaildemander: "",
    messagedemander: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setNewDemande({ ...newDemande, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nomdemader, emaildemander, messagedemander } = newDemande;
    if (!nomdemader || !emaildemander || !messagedemander) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${BASE_URL}/api/lumen/demande`, {
        nomdemader,
        emaildemander,
        messagedemander
      });

      setNewDemande({
        nomdemader: "",
        emaildemander: "",
        messagedemander: ""
      });

      alert("Demande ajoutée avec succès !");
      console.log("Nouvelle demande :", response.data);

    } catch (err) {
      console.error("Erreur Axios:", err);
      alert(
        "Erreur lors de l'ajout de la demande : " +
        (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3">
      <h1>Ajouter une nouvelle demande</h1>

      <form onSubmit={handleSubmit} className="mb-4 bg-success text-white p-3 rounded">
        <div className="mb-3">
          <label>Nom du demandeur</label>
          <input
            type="text"
            className="form-control"
            name="nomdemader"
            value={newDemande.nomdemader}
            onChange={handleChange}
            placeholder="Nom du demandeur"
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="emaildemander"
            value={newDemande.emaildemander}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-3">
          <label>Message</label>
          <textarea
            className="form-control"
            name="messagedemander"
            value={newDemande.messagedemander}
            onChange={handleChange}
            placeholder="Rédigez votre message"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-light text-success"
          disabled={loading}
        >
          {loading ? "Envoi..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
}