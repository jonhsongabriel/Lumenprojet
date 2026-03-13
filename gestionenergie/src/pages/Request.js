import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function Request() {
  const [demandes, setDemandes] = useState([]);
  const BASE_URL = ""; // URL relative → fonctionne local et prod

  useEffect(() => {
    // récupérer les demandes depuis l'API
    fetch(`${BASE_URL}/api/lumen/demande`)
      .then(res => res.json())
      .then(data => setDemandes(data))
      .catch(() => setDemandes([]));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Liste des demandes</h1>
      {demandes.length === 0 ? (
        <p>Aucune demande pour le moment.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="text-success">N°</th>
              <th className="text-success">Nom du client</th>
              <th className="text-success">Type de demande</th>
              <th className="text-success">Description</th>
              <th className="text-success">Date</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande, index) => (
              <tr key={demande.id}>
                <td>{index + 1}</td>
                <td>{demande.nomdemader}</td>
                <td>{demande.emaildemander}</td>
                <td>{demande.messagedemander}</td>
                <td>
                  {demande.createdAt
                    ? new Date(demande.createdAt).toLocaleString("fr-FR")
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Request;