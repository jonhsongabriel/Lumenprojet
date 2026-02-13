import React, { useState } from "react";
import axios from "axios";

function Demande() {
  const [newDemande, setNewDemande] = useState({
    nomdemader: "",
    emaildemander: "",
    messagedemander: "",
    tempdemader: "",
  });

  // --- Gérer la saisie des champs
  const handleChange = (e) => {
    setNewDemande({ ...newDemande, [e.target.name]: e.target.value });
  };

  // --- Soumettre une nouvelle demande
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nomdemader, emaildemander, messagedemander, tempdemader } = newDemande;
    if (!nomdemader || !emaildemander || !messagedemander || !tempdemader) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      const formattedDate = new Date(tempdemader).toISOString();

      await axios.post("http://localhost:5000/api/demande", {
        nomdemader,
        emaildemander,
        messagedemander,
        tempdemader: formattedDate,
      });

      setNewDemande({ nomdemader: "", emaildemander: "", messagedemander: "", tempdemader: "" });
      alert("Demande ajoutée avec succès !");
    } catch (err) {
      console.error("Erreur Axios:", err);
      alert("Erreur lors de l'ajout de la demande : " + (err.response?.data?.message || err.message));
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
        <div className="mb-3">
          <label>Date</label>
          <input
            type="datetime-local"
            className="form-control"
            name="tempdemader"
            value={newDemande.tempdemader}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-light text-success">
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default Demande;
