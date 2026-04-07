// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export default function Dashboard() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/projets`);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();
        setProjets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur fetch projets :", err);
        setError(err.message || "Impossible de charger les projets");
        setProjets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ textAlign: "center" }}>Bienvenue sur la plateforme Lumen</h1>
        <button onClick={() => navigate("/ajouterprojet")} className="btn btn-primary">
          Ajouter un projet
        </button>
      </div>

      {/* TEXTE ORIGINAL CONSERVÉ */}
      <div style={{ marginTop: "20px" }}>
        <p>
          Le projet <strong>Lumen</strong> vise à promouvoir l’énergie solaire comme solution
          durable et écologique pour la production d’électricité. Grâce à la technologie
          photovoltaïque, l’énergie du soleil est transformée en électricité utilisable pour
          l’éclairage, les équipements domestiques et les activités économiques. Ce projet favorise
          l’autonomie énergétique, la réduction des émissions de carbone et l’amélioration
          des conditions de vie des populations.
        </p>
      </div>

      {loading && <p>Chargement des projets...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {projets.length === 0 && !loading && !error && <p>Aucun projet pour le moment</p>}

        {projets.map((projet) => (
          <div
            key={projet.id || Math.random()}
            style={{
              width: "200px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            {projet.image && (
              <img
                src={projet.image}
                alt={projet.nom}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "5px",
                }}
              />
            )}
            <h4>{projet.nom}</h4>
            <p>{projet.description ? projet.description.slice(0, 50) + "..." : ""}</p>
          </div>
        ))}
      </div>
    </div>
  );
}