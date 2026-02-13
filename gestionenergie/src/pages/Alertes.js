import React, { useEffect, useState } from "react";

export default function Alert() {
  const [alertes, setAlertes] = useState([]);

  useEffect(() => {
    // Récupérer les alertes depuis le backend
    fetch("http://localhost:5000/api/alertes")
      .then(res => res.json())
      .then(data => setAlertes(data))
      .catch(err => console.error("Erreur fetch alertes :", err));
  }, []);

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
            {alertes.map((alerte, idx) => (
              <tr key={idx}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{alerte.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{alerte.projet || "N/A"}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{alerte.message}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{new Date(alerte.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
