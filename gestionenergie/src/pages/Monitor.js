import React, { useEffect, useState } from "react";

function Monitor() {
  const [data, setData] = useState({
    tension: 0,
    courant: 0,
    puissance: 0,
  });

  const [historique, setHistorique] = useState([]);

  const API = "http://localhost:8000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/donnees-solaire`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${API}/historique`);
        const data = await res.json();
        setHistorique(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>📊 Monitor Panneau Solaire</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Card title="Tension" value={`${data.tension} V`} />
        <Card title="Courant" value={`${data.courant} A`} />
        <Card title="Puissance" value={`${data.puissance} W`} />
      </div>

      <h3 style={{ marginTop: "30px" }}>Historique</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Tension</th>
            <th>Courant</th>
            <th>Puissance</th>
          </tr>
        </thead>
        <tbody>
          {historique.map((h) => (
            <tr key={h.id}>
              <td>{h.timestamp}</td>
              <td>{h.tension}</td>
              <td>{h.courant}</td>
              <td>{h.puissance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={card}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

const card = {
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
};

export default Monitor;