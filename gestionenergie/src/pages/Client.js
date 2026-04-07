// src/pages/Client.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api";

export default function Client() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    nomclient: "",
    prenomclient: "",
    adresseclient: "",
    contactclient: "",
    emailclient: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setError(null);
      const res = await axios.get(`${API_URL}/client`);
      setClients(Array.isArray(res.data) ? res.data : []); // ✅ correction
    } catch (err) {
      console.error("Erreur fetch clients :", err);
      setError(err.message || "Erreur lors du chargement des clients");
      setClients([]);
    }
  };

  const handleChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${API_URL}/client`, newClient);

      setNewClient({
        nomclient: "",
        prenomclient: "",
        adresseclient: "",
        contactclient: "",
        emailclient: ""
      });

      fetchClients();
    } catch (err) {
      console.error("Erreur ajout client :", err);
      setError(err.response?.data?.message || "Impossible d'ajouter le client"); // ✅ correction
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce client ?")) return;

    try {
      await axios.delete(`${API_URL}/client/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Erreur suppression client :", err);
      setError(err.response?.data?.message || "Impossible de supprimer le client"); // ✅ correction
    }
  };

  const handleEdit = async (client) => {
    const nomclient = prompt("Nom :", client.nomclient);
    const prenomclient = prompt("Prénom :", client.prenomclient);
    const adresseclient = prompt("Adresse :", client.adresseclient);
    const contactclient = prompt("Contact :", client.contactclient);
    const emailclient = prompt("Email :", client.emailclient);

    if (nomclient && prenomclient && adresseclient && contactclient && emailclient) {
      try {
        await axios.put(`${API_URL}/client/${client.id}`, {
          nomclient,
          prenomclient,
          adresseclient,
          contactclient,
          emailclient
        });
        fetchClients();
      } catch (err) {
        console.error("Erreur modification client :", err);
        setError(err.response?.data?.message || "Impossible de modifier le client"); // ✅ correction
      }
    }
  };

  return (
    <div className="container mt-5 bg-secondary p-4">
      <h2 className="mb-3 text-center text-white">Ajouter un Client</h2>

      {error && <p className="text-danger text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="mb-4 bg-secondary p-3 rounded">
        <div className="row mb-2">
          <div className="col-md-6">
            <label className="text-white">Nom</label>
            <input type="text" name="nomclient" value={newClient.nomclient} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="text-white">Prénom</label>
            <input type="text" name="prenomclient" value={newClient.prenomclient} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-6">
            <label className="text-white">Adresse</label>
            <input type="text" name="adresseclient" value={newClient.adresseclient} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-6">
            <label className="text-white">Contact</label>
            <input type="text" name="contactclient" value={newClient.contactclient} onChange={handleChange} className="form-control" required />
          </div>
        </div>

        <div className="mb-3">
          <label className="text-white">Email</label>
          <input type="email" name="emailclient" value={newClient.emailclient} onChange={handleChange} className="form-control" required />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Ajout en cours..." : "Ajouter"}
          </button>
        </div>
      </form>

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
          {clients.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">Aucun client</td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id || Math.random()}>
                <td>{client.nomclient || "N/A"}</td>
                <td>{client.prenomclient || "N/A"}</td>
                <td>{client.adresseclient || "N/A"}</td>
                <td>{client.contactclient || "N/A"}</td>
                <td>{client.emailclient || "N/A"}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(client)}>
                    Modifier
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(client.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}