import React, { useState, useEffect } from "react";
import axios from "axios";

function Demande() {
  const [demandes, setDemandes] = useState([]);
  const [newDemande, setNewDemande] = useState({
    nomdemader: "",
    emaildemander: "",
    messagedemander: "",
    tempdemader: "",
  });

  // --- Charger la liste des demandes
  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/demande");
      setDemandes(res.data);
    } catch (err) {
      console.error("Erreur fetch demandes:", err);
    }
  };

  // --- Gérer la saisie des champs
  const handleChange = (e) => {
    setNewDemande({ ...newDemande, [e.target.name]: e.target.value });
  };

  // --- Soumettre un nouvelle demande
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifier que tous les champs sont remplis
    const { nomdemader, emaildemander, messagedemander, tempdemader } = newDemande;
    if (!nomdemader || !emaildemander || !messagedemander || !tempdemader) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      // Convertir la date en ISO pour PostgreSQL
      const formattedDate = new Date(tempdemader).toISOString();

      const res = await axios.post("http://localhost:5000/api/demande", {
        nomdemader,
        emaildemander,
        messagedemander,
        tempdemader: formattedDate,
      });

      setNewDemande({ nomdemader: "", emaildemander: "", messagedemander: "", tempdemader: "" });
      fetchDemandes(); // Mettre à jour la liste
    } catch (err) {
      console.error("Erreur Axios:", err);
      alert("Erreur lors de l'ajout de la demande : " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="title mt-3">Ajouter une nouvelle demande</h1>
      <form onSubmit={handleSubmit} className="mb-4 container bg-success text-white p-2">
        <div className="mb-3">
          <label>Nom du demander</label>
          <input
            type="text"
            className="form-control"
            name="nomdemader"
            value={newDemande.nomdemader}
            onChange={handleChange}
            placeholder="Nom du demander"
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
        <button type="submit" className="btn btn-success">Ajouter</button>
      </form>

      <h2 className="text-center mt-4">Liste des demandes</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((d) => (
            <tr key={d.id}>
              <td>{d.nomdemader}</td>
              <td>{d.emaildemander}</td>
              <td>{d.messagedemander}</td>
              <td>{new Date(d.tempdemader).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Demande;
