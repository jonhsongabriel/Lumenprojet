// src/pages/Projets.js
import React, { useState, useEffect } from "react";
import API_URL from "../config/api";

function Projets() {
  const [projets, setProjets] = useState([]);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const res = await fetch(`${API_URL}/projets`, {
          headers: { Authorization: "Bearer " + token }
        });
        const data = await res.json();
        setProjets(data);
      } catch (err) {
        console.error("Erreur fetch projets:", err);
      }
    };
    fetchProjets();
  }, [token]);

  const deleteProjet = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce projet ?")) return;
    try {
      await fetch(`${API_URL}/projets/${id}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
      });
      setProjets(projets.filter(p => p.id !== id));
    } catch (err) {
      console.error("Erreur suppression projet:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Projets</h2>

      {role !== "client" && (
        <a href="/ajouterprojet" className="btn btn-success mb-3">Ajouter Projet</a>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projets.map(p => (
            <tr key={p.id}>
              <td>{p.nom}</td>
              <td>{p.description}</td>
              <td>{p.client}</td>
              <td>
                {role !== "client" && (
                  <>
                    <a href={`/modifierprojet/${p.id}`} className="btn btn-warning btn-sm me-2">Modifier</a>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteProjet(p.id)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Projets;