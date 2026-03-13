// src/pages/Client.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api"; // <-- URL centralisée

function Client() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    nomclient: "",
    prenomclient: "",
    adresseclient: "",
    contactclient: "",
    emailclient: ""
  });

  // Charger les clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios
      .get(`${API_URL}/client`) // <-- utilise API_URL
      .then(res => setClients(res.data))
      .catch(err => console.error("Erreur fetch clients :", err));
  };

  // Gérer la saisie
  const handleChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  // Ajouter un client
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/client`, newClient) // <-- utilise API_URL
      .then(() => {
        fetchClients();
        setNewClient({ nomclient: "", prenomclient: "", adresseclient: "", contactclient: "", emailclient: "" });
      })
      .catch(err => console.error("Erreur ajout client :", err));
  };

  // Supprimer un client
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      axios
        .delete(`${API_URL}/client/${id}`) // <-- utilise API_URL
        .then(() => fetchClients())
        .catch(err => console.error("Erreur suppression client :", err));
    }
  };

  // Modifier un client
  const handleEdit = (client) => {
    const nomclient = prompt("Nom :", client.nomclient);
    const prenomclient = prompt("Prénom :", client.prenomclient);
    const adresseclient = prompt("Adresse :", client.adresseclient);
    const contactclient = prompt("Contact :", client.contactclient);
    const emailclient = prompt("Email :", client.emailclient);

    if (nomclient && prenomclient && adresseclient && contactclient && emailclient) {
      axios
        .put(`${API_URL}/client/${client.id}`, { nomclient, prenomclient, adresseclient, contactclient, emailclient }) // <-- utilise API_URL
        .then(() => fetchClients())
        .catch(err => console.error("Erreur modification client :", err));
    }
  };

  return (
    <div className="container mt-5 bg-secondary p-4">
      <h2 className="mb-3 text-center text-white">Ajouter un Client</h2>
      <p className="text-white text-center">Merci de remplir correctement le formulaire pour ajouter un nouveau client.</p>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="mb-4 bg-secondary p-3 rounded">
        <div className="row mb-2">
          <div className="col-md-6">
            <label className="text-white" htmlFor="nomclient">Nom du client</label>
            <input type="text" name="nomclient" value={newClient.nomclient} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="text-white" htmlFor="prenomclient">Prénom du client</label>
            <input type="text" name="prenomclient" value={newClient.prenomclient} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <label className="text-white" htmlFor="adresseclient">Adresse du client</label>
            <input type="text" name="adresseclient" value={newClient.adresseclient} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="text-white" htmlFor="contactclient">Contact du client</label>
            <input type="text" name="contactclient" value={newClient.contactclient} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-12">
            <label className="text-white" htmlFor="emailclient">Adresse email du client</label>
            <input type="email" name="emailclient" value={newClient.emailclient} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">Ajouter</button>
        </div>
      </form>

      {/* Tableau */}
      <h2 className="text-center text-white mt-4">Liste des clients</h2>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Adresse</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.nomclient}</td>
              <td>{client.prenomclient}</td>
              <td>{client.adresseclient}</td>
              <td>{client.contactclient}</td>
              <td>{client.emailclient}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(client)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(client.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Client;