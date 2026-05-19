import React, { useEffect, useState } from "react";

function Monitor() {

  const [data, setData] = useState({
    voltage: 0,
    current: 0,
    power: 0,
  });

  const [historique, setHistorique] = useState([]);

  // 🔥 IMPORTANT : ton backend Lumen
  const API = "http://localhost:5000/api";

  // =========================
  // LIVE DATA SOLARMAN
  // =========================
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/solarman/inverter/data`);
        const json = await res.json();

        if (json?.data) {
          setData({
            voltage: json.data.voltage,
            current: json.data.current,
            power: json.data.power,
          });

          // 🔥 ajout historique local temps réel
          setHistorique((old) => [
            ...old.slice(-15),
            {
              id: Date.now(),
              timestamp: new Date().toLocaleTimeString(),
              tension: json.data.voltage,
              courant: json.data.current,
              puissance: json.data.power,
            }
          ]);
        }

      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);

  }, []);

  // =========================
  // UI
  // =========================
  return (
    <div style={{ padding: "20px" }}>

      <h2>📊 Monitor Solaire (SOLARMAN SIM)</h2>

      {/* ================= CARDS ================= */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <Card title="Tension" value={`${data.voltage} V`} />
        <Card title="Courant" value={`${data.current} A`} />
        <Card title="Puissance" value={`${data.power} W`} />

      </div>

      {/* ================= HISTORY ================= */}
      <h3 style={{ marginTop: "30px" }}>📈 Historique temps réel</h3>

      <table className="table" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Heure</th>
            <th>Tension</th>
            <th>Courant</th>
            <th>Puissance</th>
          </tr>
        </thead>

        <tbody>
          {historique.map((h) => (
            <tr key={h.id}>
              <td>{h.timestamp}</td>
              <td>{h.tension} V</td>
              <td>{h.courant} A</td>
              <td>{h.puissance} W</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

// =========================
// CARD COMPONENT
// =========================
function Card({ title, value }) {
  return (
    <div style={card}>
      <h4>{title}</h4>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>{value}</p>
    </div>
  );
}

const card = {
  padding: "20px",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  minWidth: "150px",
  textAlign: "center"
};

export default Monitor;