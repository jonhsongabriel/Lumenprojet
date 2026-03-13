// src/pages/Monitor.js
import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import API_URL from "../config/api"; // config dynamique local/prod

// Onglets projet
function Tabs({ activeTab, setActiveTab, projet, donnees, historique }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        {["Centrale", "Appareils", "Alertes"].map((tab) => (
          <button
            key={tab}
            style={{
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: activeTab === tab ? "#007bff" : "#eee",
              color: activeTab === tab ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "20px" }}>
        {activeTab === "Centrale" && (
          <div>
            <h3>{projet.nom}</h3>
            <p>{projet.description}</p>
            {donnees.centrale && (
              <div>
                <p><strong>Tension :</strong> {donnees.centrale.tension} V</p>
                <p><strong>Courant :</strong> {donnees.centrale.courant} A</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "Appareils" && (
          <div>
            {donnees.appareils ? (
              <>
                <p><strong>Onduleur :</strong> {donnees.appareils.onduleur}</p>
                <p><strong>Batterie :</strong> {donnees.appareils.batterie}</p>
                <p><strong>Datalog :</strong> {donnees.appareils.datalog}</p>
              </>
            ) : (
              <p>Chargement des appareils...</p>
            )}
          </div>
        )}

        {activeTab === "Alertes" && (
          <div>
            {donnees.alertes ? (
              donnees.alertes.length > 0
                ? donnees.alertes.map((a, i) => <p key={i}>{a}</p>)
                : <p>Pas d'alertes pour l'instant.</p>
            ) : (
              <p>Chargement des alertes...</p>
            )}
          </div>
        )}

        {historique.length > 0 && activeTab === "Centrale" && (
          <div style={{ marginTop: "40px", width: "100%", height: 300 }}>
            <h4>Mesures Panneau Solaire (Temps réel)</h4>
            <ResponsiveContainer>
              <LineChart data={historique.slice().reverse()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tension" stroke="#8884d8" name="Tension (V)" />
                <Line type="monotone" dataKey="courant" stroke="#82ca9d" name="Courant (A)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Monitor() {
  const [projets, setProjets] = useState([]);
  const [activeProjet, setActiveProjet] = useState(null);
  const [activeTab, setActiveTab] = useState("Centrale");
  const [donnees, setDonnees] = useState({});
  const [historique, setHistorique] = useState([]);

  // Utiliser API_URL dynamique pour local/prod
  const API_BASE = API_URL;

  // Charger les projets
  useEffect(() => {
    fetch(`${API_BASE}/projets`)
      .then(res => res.json())
      .then(data => setProjets(data))
      .catch(err => console.error("Erreur fetch projets :", err));
  }, [API_BASE]);

 useEffect(() => {
  if (!activeProjet || !activeProjet.moniteurIP) return; // ← vérification

  const interval = setInterval(() => {
    const moniteurURL = activeProjet.moniteurIP.startsWith("http")
      ? activeProjet.moniteurIP
      : `http://${activeProjet.moniteurIP}:8000`;

    fetch(`${moniteurURL}/donnees-solaire`)
      .then(res => res.json())
      .then(data => {
        setDonnees(data);

        if (data.centrale) {
          setHistorique(prev => [
            { ...data.centrale, timestamp: new Date().toLocaleTimeString() },
            ...prev
          ].slice(0, 50));
        }
      })
      .catch(err => console.error("Erreur fetch données temps réel :", err));
  }, 1000);

  return () => clearInterval(interval);
}, [activeProjet]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard - Projets Lumen</h1>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginBottom: "30px" }}>
        {projets.length === 0 && <p>Aucun projet disponible</p>}
        {projets.map((projet, idx) => (
          <div
            key={idx}
            style={{
              width: "200px",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "10px",
            }}
            onClick={() => {
              setActiveProjet(projet);
              setActiveTab("Centrale");
              setDonnees({});
              setHistorique([]);
            }}
          >
            {projet.image && (
              <img
                src={projet.image} // chemin relatif /images/... depuis Node.js
                alt={projet.nom}
                style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px" }}
              />
            )}
            <h4>{projet.nom}</h4>
            <p>{projet.description.slice(0, 50)}...</p>
          </div>
        ))}
      </div>

      {activeProjet && (
        <Tabs
          projet={activeProjet}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          donnees={donnees}
          historique={historique}
        />
      )}
    </div>
  );
}