// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api"; // <-- URL dynamique local/prod

export default function Dashboard() {
  const [projets, setProjets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/projets`) // fetch dynamique
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setProjets(data))
      .catch((err) => console.error("Erreur fetch projets :", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ textAlign: "center" }}>Bienvenue sur la plateforme Lumen</h1>
        <button onClick={() => navigate("/ajouterprojet")}>Ajouter un projet</button>
      </div>

      <div>
        <p>
          Le projet <strong>Lumen Gumlfstate</strong> vise à promouvoir l’énergie solaire
          comme solution durable et écologique pour la production d’électricité. Grâce à la technologie
          photovoltaïque, l’énergie du soleil est transformée en électricité utilisable pour
          l’éclairage, les équipements domestiques et les activités économiques. Ce projet favorise
          l’autonomie énergétique, la réduction des émissions de carbone et l’amélioration
          des conditions de vie des populations.
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {projets.length === 0 && <p>Aucun projet pour le moment</p>}

        {projets.map((projet, idx) => (
          <div
            key={idx}
            style={{
              width: "200px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            {projet.image && (
              <img
                src={projet.image} // <-- chemin relatif direct /images/... déjà géré par Node
                alt={projet.nom}
                style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px" }}
              />
            )}
            <h4>{projet.nom}</h4>
            <p>{projet.description.slice(0, 50)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}