import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import API_URL from "../config/api";

export default function Request() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/demande`);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);

        const data = await res.json();

        // S'assurer que c'est un tableau
        setDemandes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur fetch demandes :", err);
        setError("Impossible de charger les demandes");
        setDemandes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Liste des demandes</h1>

      {loading && <p>Chargement...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && demandes.length === 0 && !error && (
        <p>Aucune demande pour le moment.</p>
      )}

      {demandes.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-success">N°</th>
              <th className="text-success">Nom du client</th>
              <th className="text-success">Email</th>
              <th className="text-success">Message</th>
              <th className="text-success">Date</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((demande, index) => (
              <tr key={demande.id || index}>
                <td>{index + 1}</td>
                <td>{demande.nomdemader || "—"}</td>
                <td>{demande.emaildemander || "—"}</td>
                <td>{demande.messagedemander || "—"}</td>
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