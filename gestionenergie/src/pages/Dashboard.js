import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [donnees, setDonnees] = useState({ tension: 0, courant: 0 });
  const [historique, setHistorique] = useState([]);

  // Récupérer la dernière mesure toutes les secondes
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:8000/donnees-solaire")
        .then(res => res.json())
        .then(data => {
          setDonnees(data);
          setHistorique(prev => [{ ...data, timestamp: new Date().toLocaleTimeString() }, ...prev].slice(0, 20));
        })
        .catch(err => console.error(err));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Dashboard Panneau Solaire</h2>

      <div style={{ marginBottom: "20px" }}>
        <h3>Données en temps réel</h3>
        <p><strong>Tension :</strong> {donnees.tension} V</p>
        <p><strong>Courant :</strong> {donnees.courant} A</p>
      </div>

      <div style={{ width: "100%", height: 400 }}>
        <h3>Graphique en temps réel</h3>
        <ResponsiveContainer>
          <LineChart data={historique.reverse()}>
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
    </div>
  );
}

export default Dashboard;
