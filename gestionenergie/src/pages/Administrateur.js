import React, { useState, useEffect } from "react";
import axios from "axios";

function Administrateur() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ nom: "", email: "", role: "", motdepasse: "" });

  // Charger les administrateurs
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = () => {
    axios.get("http://localhost:5000/api/administrateurs")
      .then(res => setAdmins(res.data))
      .catch(err => console.error(err));
  };

  // Gérer la saisie
  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  // Ajouter un administrateur
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/administrateurs", newAdmin)
      .then(res => {
        fetchAdmins(); // Mettre à jour la liste
        setNewAdmin({ nom: "", email: "", role: "", motdepasse: "" });
      })
      .catch(err => console.error(err));
  };

  // Supprimer un administrateur
  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet administrateur ?")) {
      axios.delete(`http://localhost:5000/api/administrateurs/${id}`)
        .then(() => fetchAdmins())
        .catch(err => console.error(err));
    }
  };

  // Modifier un administrateur
  const handleEdit = (admin) => {
    const nom = prompt("Nom :", admin.nom);
    const email = prompt("Email :", admin.email);
    const role = prompt("Rôle :", admin.role);

    if (nom && email && role) {
      axios.put(`http://localhost:5000/api/administrateurs/${admin.id}`, { nom, email, role })
        .then(() => fetchAdmins())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="container mt-5 bg-secondary">
      <h2 className="mb-3 text-center text-white">Ajouter des  administrateurs</h2>
      <p className="text-white text-center">
        Merci des bien remplir le formulaire pour ajouter nouveau.
      </p>
      {/* Formulaire d’ajout */}
      <form onSubmit={handleSubmit} className="mb-4 bg-secondary p-2 ">
        <div className="row">
          <div className="col-md-6">
            <label className="text-white" for="nom">Nom</label>
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
            <label className="text-white" for="email">Adresse Email</label>
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
          <div className="row">
          <div className="col-md-6">
            <label className="text-white" for="role">Rôle</label>
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
            <label className="text-white" for="password">Mot de passe</label>
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
          <div className="row text-center">
            <div className="text-center pt-4 pb-4">
                <button type="submit" className="btn btn-success w-auto text-center">Ajouter</button>
            </div>
          </div>
      </form>

      {/* Tableau */}
      <h2 className="text-center text-white">Liste des administrateur disponible</h2>
      <table className="table table-striped p-4">
        <thead className="p-4">
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
