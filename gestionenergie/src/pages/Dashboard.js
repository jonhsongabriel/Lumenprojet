import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/projets")
      .then(res => res.json())
      .then(data => setProjets(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Dashboard - Projets</h1>
        <button onClick={() => navigate("/ajouterprojet")}>Ajouter un projet</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {projets.length === 0 && <p>Aucun projet pour le moment</p>}
        {projets.map((projet, idx) => (
          <div key={idx} style={{ width: "200px", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
            {projet.image && <img src={`http://localhost:5000${projet.image}`} alt={projet.nom} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px" }} />}
            <h4>{projet.nom}</h4>
            <p>{projet.description.slice(0, 50)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
