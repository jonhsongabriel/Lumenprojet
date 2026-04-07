// src/pages/Alert.js
import React, { useEffect, useState } from "react";
import API_URL from "../config/api";

export default function Alert() {
  const [alertes, setAlertes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlertes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/alertes`);

        if (!res.ok) {
          throw new Error(`Erreur HTTP ${res.status}`);
        }

        const data = await res.json();

        // ✅ Correction importante : vérifier que c'est bien un tableau
        setAlertes(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur fetch alertes :", err);
        setError(err.message || "Erreur inconnue");
        setAlertes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlertes();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Chargement des alertes...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>Erreur : {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Alertes des projets</h2>

      {alertes.length === 0 ? (
        <p>Aucune alerte pour le moment.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Projet</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Message</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date / Heure</th>
            </tr>
          </thead>
          <tbody>
            {alertes.map((alerte) => (
              <tr key={alerte.id || Math.random()}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {alerte.id || "N/A"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {alerte.projet || "N/A"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {alerte.message || "N/A"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {alerte.timestamp
                    ? new Date(alerte.timestamp).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}