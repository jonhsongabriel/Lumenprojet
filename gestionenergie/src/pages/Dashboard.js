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
        <h1 style={{ textAlign: "center"}}>Bienvenu dans le plateforme de lumen </h1>
        <button onClick={() => navigate("/ajouterprojet")}>Ajouter un projet</button>
      </div>
      <div>
        <p style={{alignItems: "center"}}>
          Le projet **Lumen Gumlfstate** vise à promouvoir l’utilisation de l’énergie solaire 
          comme solution durable et écologique pour la production d’électricité. 
          À travers l’installation de panneaux solaires, ce projet a pour objectif de fournir 
          une source d’énergie propre, fiable et accessible aux ménages et aux entreprises.
          L’initiative permet de réduire la dépendance aux sources d’énergie traditionnelles, 
          souvent coûteuses et polluantes, tout en contribuant à la protection de l’environnement. 
          Grâce à la technologie photovoltaïque, l’énergie du soleil est transformée en électricité
           utilisable pour l’éclairage, les équipements domestiques et les activités économiques.
          Le projet **Lumen Gumlfstate** s’inscrit ainsi dans une démarche de développement durable, 
          en favorisant l’autonomie énergétique, la réduction des émissions de carbone et 
          l’amélioration des conditions de vie des populations.

          </p>
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
