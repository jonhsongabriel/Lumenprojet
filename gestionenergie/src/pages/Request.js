import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function Request() {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    // récupérer les demandes depuis l'API
    fetch("http://localhost:5000/api/demande")
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
              <th>#</th>
              <th>Nom du client</th>
              <th>Type de demande</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande, index) => (
              <tr key={demande.id}>
                <td>{index + 1}</td>
                <td>{demande.nomdemader}</td>
                <td>{demande.emaildemander}</td>
                <td>{demande.messagedemander}</td>
                <td>{new Date(demande.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Request;
