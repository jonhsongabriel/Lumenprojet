// src/pages/Administrateur.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api"; // <-- URL centralisée local/prod

function Administrateur() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({
    nom: "",
    email: "",
    role: "",
    motdepasse: "",
  });

  // Charger les administrateurs
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    axios
      .get(`${API_URL}/administrateurs`) // <-- API_URL centralisé
      .then((res) => setAdmins(res.data))
      .catch((err) => console.error("Erreur fetch admins :", err));
  };

  // Gérer la saisie du formulaire
  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  // Ajouter un administrateur
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/administrateurs`, newAdmin) // <-- API_URL centralisé
      .then(() => {
        fetchAdmins(); // Mettre à jour la liste
        setNewAdmin({ nom: "", email: "", role: "", motdepasse: "" });
      })
      .catch((err) => console.error("Erreur ajout admin :", err));
  };

  // Supprimer un administrateur
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet administrateur ?")) {
      axios
        .delete(`${API_URL}/administrateurs/${id}`) // <-- API_URL centralisé
        .then(() => fetchAdmins())
        .catch((err) => console.error("Erreur suppression admin :", err));
    }
  };

  // Modifier un administrateur
  const handleEdit = (admin) => {
    const nom = prompt("Nom :", admin.nom);
    const email = prompt("Email :", admin.email);
    const role = prompt("Rôle :", admin.role);

    if (nom && email && role) {
      axios
        .put(`${API_URL}/administrateurs/${admin.id}`, { nom, email, role }) // <-- API_URL centralisé
        .then(() => fetchAdmins())
        .catch((err) => console.error("Erreur modification admin :", err));
    }
  };

  return (
    <div className="container mt-5 bg-secondary">
      <h2 className="mb-3 text-center text-white">Ajouter des administrateurs</h2>
      <p className="text-white text-center">
        Merci de bien remplir le formulaire pour ajouter un nouvel administrateur.
      </p>

      {/* Formulaire d’ajout */}
      <form onSubmit={handleSubmit} className="mb-4 bg-secondary p-2">
        <div className="row">
          <div className="col-md-6">
            <label className="text-white" htmlFor="nom">Nom</label>
            <input
              type="text"
              name="nom"
              value={newAdmin.nom}
              onChange={handleChange}
              placeholder="Nom"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="text-white" htmlFor="email">Adresse Email</label>
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <label className="text-white" htmlFor="role">Rôle</label>
            <input
              type="text"
              name="role"
              value={newAdmin.role}
              onChange={handleChange}
              placeholder="Rôle"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="text-white" htmlFor="motdepasse">Mot de passe</label>
            <input
              type="password"
              name="motdepasse"
              value={newAdmin.motdepasse}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mt-3 text-center">
          <div className="col">
            <button type="submit" className="btn btn-success w-auto">
              Ajouter
            </button>
          </div>
        </div>
      </form>

      {/* Tableau des administrateurs */}
      <h2 className="text-center text-white mt-4">Liste des administrateurs disponibles</h2>
      <table className="table table-striped p-4">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.nom}</td>
              <td>{admin.email}</td>
              <td>{admin.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(admin)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(admin.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Administrateur;