import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import MainLayout from "../layouts/MainLayout";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {

  const [projets, setProjets] = useState([]);
  const [solarman, setSolarman] = useState(null);
  const [devices, setDevices] = useState([]);
  const [history, setHistory] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [resProjets, resSolarman, resDevices] = await Promise.all([
          fetch(`${API_URL}/projets`),
          fetch(`${API_URL}/solarman/inverter/data`),
          fetch(`${API_URL}/solarman/devices`)
        ]);

        // -------------------------
        // PROJETS
        // -------------------------
        if (!resProjets.ok) {
          const text = await resProjets.text();
          throw new Error(`Projets error ${resProjets.status}: ${text}`);
        }

        const projetsData = await resProjets.json();
        setProjets(Array.isArray(projetsData) ? projetsData : []);

        // -------------------------
        // SOLARMAN DATA
        // -------------------------
        if (resSolarman.ok) {
          const solData = await resSolarman.json();
          setSolarman(solData.data);

          setHistory([
            {
              time: new Date().toLocaleTimeString(),
              power: solData.data.power
            }
          ]);
        }

        // -------------------------
        // DEVICES
        // -------------------------
        if (resDevices.ok) {
          const devData = await resDevices.json();
          setDevices(devData.devices || []);
        }

      } catch (err) {
        console.error(err);
        setError(err.message || "Erreur chargement dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  // =========================
  // LIVE SIMULATION
  // =========================
  useEffect(() => {

    const interval = setInterval(() => {
      setSolarman(prev => {
        if (!prev) return prev;

        const newPower = Math.max(
          800,
          Math.min(2000, prev.power + (Math.random() * 300 - 150))
        );

        setHistory(old => [
          ...old.slice(-10),
          {
            time: new Date().toLocaleTimeString(),
            power: Math.round(newPower)
          }
        ]);

        return {
          ...prev,
          power: Math.round(newPower)
        };
      });
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <MainLayout>
        <p>⏳ Chargement du dashboard...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* ================= HEADER ================= */}
      <div className="mb-3">
        <h3>📊 Tableau de bord énergie</h3>
        <p className="text-muted">Supervision solaire en temps réel</p>
      </div>

      {/* ================= ERROR ================= */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* ================= KPI ================= */}
      {solarman && (
        <div className="row mb-4">

          <div className="col-md-4 mb-2">
            <div className="card p-3 text-center shadow-sm">
              <h6>⚡ Puissance</h6>
              <h3>{solarman.power} W</h3>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card p-3 text-center shadow-sm">
              <h6>🔋 Aujourd’hui</h6>
              <h3>{solarman.energyToday} kWh</h3>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card p-3 text-center shadow-sm">
              <h6>📊 Total</h6>
              <h3>{solarman.totalEnergy} kWh</h3>
            </div>
          </div>

        </div>
      )}

      {/* ================= GRAPH ================= */}
      {history.length > 0 && (
        <div className="card p-3 shadow-sm mb-4">
          <h6>📈 Production solaire (temps réel)</h6>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={history}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="power" stroke="#f39c12" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* ================= DEVICES ================= */}
      <div className="row mb-4">

        {devices.map((d) => (
          <div className="col-md-6 mb-2" key={d.id}>
            <div className="card p-3 shadow-sm">

              <h6>🔌 {d.name}</h6>

              <span className={d.status === "online" ? "text-success" : "text-danger"}>
                {d.status}
              </span>

            </div>
          </div>
        ))}

      </div>

      {/* ================= PROJETS ================= */}
      {projets.length === 0 && (
        <div className="alert alert-warning">
          Aucun projet disponible
        </div>
      )}

      <div className="row">

        {projets.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-3" key={p.id}>

            <div className="card shadow-sm border-0 h-100">

              <div className="card-body">

                <h5>⚡ {p.nom}</h5>
                <p className="text-muted">{p.description}</p>

                <div className="small text-secondary mb-3">
                  <div>👤 Client : {p.client || "N/A"}</div>
                  <div>⚙️ Statut : actif</div>
                  <div>🔋 Monitoring : disponible</div>
                </div>

                <div className="d-grid gap-2">

                  <Link to={`/rapport/${p.id}`} className="btn btn-primary btn-sm">
                    📊 Rapport
                  </Link>

                  <Link to={`/plan?project=${p.id}`} className="btn btn-outline-success btn-sm">
                    📍 Localisation
                  </Link>

                  <Link to={`/analyse/${p.id}`} className="btn btn-outline-dark btn-sm">
                    📈 Analyse
                  </Link>

                  <Link to={`/alertes/${p.id}`} className="btn btn-outline-danger btn-sm">
                    🚨 Alertes
                  </Link>

                </div>

              </div>

            </div>

          </div>
        ))}

      </div>

    </MainLayout>
  );
}

export default Dashboard;