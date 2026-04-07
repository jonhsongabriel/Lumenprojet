// src/pages/Administrateur.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config/api";

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

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(`${API_URL}/administrateurs`);
      setAdmins(res.data);
    } catch (err) {
      console.error("Erreur fetch admins :", err);
    }
  };

  // Gérer la saisie
  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  // Ajouter
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/administrateurs`, newAdmin);
      setNewAdmin({ nom: "", email: "", role: "", motdepasse: "" });
      fetchAdmins();
    } catch (err) {
      console.error("Erreur ajout admin :", err);
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet administrateur ?")) {
      try {
        await axios.delete(`${API_URL}/administrateurs/${id}`);
        fetchAdmins();
      } catch (err) {
        console.error("Erreur suppression admin :", err);
      }
    }
  };

  // Modifier
  const handleEdit = async (admin) => {
    const nom = prompt("Nom :", admin.nom);
    const email = prompt("Email :", admin.email);
    const role = prompt("Rôle :", admin.role);

    if (nom && email && role) {
      try {
        await axios.put(`${API_URL}/administrateurs/${admin.id}`, {
          nom,
          email,
          role,
        });
        fetchAdmins();
      } catch (err) {
        console.error("Erreur modification admin :", err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3 text-center">Ajouter des administrateurs</h2>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-6">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              value={newAdmin.nom}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newAdmin.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-6">
            <label>Rôle</label>
            <input
              type="text"
              name="role"
              value={newAdmin.role}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="col-md-6">
            <label>Mot de passe</label>
            <input
              type="password"
              name="motdepasse"
              value={newAdmin.motdepasse}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <div className="text-center mt-3">
          <button type="submit" className="btn btn-success">
            Ajouter
          </button>
        </div>
      </form>

      {/* Tableau */}
      <h2 className="text-center mt-4">Liste des administrateurs</h2>
      <table className="table table-striped">
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