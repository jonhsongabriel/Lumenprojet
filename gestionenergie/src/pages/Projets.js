import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";

function Projets() {

  const [projets, setProjets] = useState([]);
  const [solarman, setSolarman] = useState(null);
  const [devices, setDevices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        // -------------------
        // PROJETS
        // -------------------
        if (!resProjets.ok) {
          throw new Error("Erreur chargement projets");
        }

        const data = await resProjets.json();
        setProjets(Array.isArray(data) ? data : []);

        // -------------------
        // SOLARMAN
        // -------------------
        if (resSolarman.ok) {
          const sol = await resSolarman.json();
          setSolarman(sol.data);
        }

        // -------------------
        // DEVICES
        // -------------------
        if (resDevices.ok) {
          const dev = await resDevices.json();
          setDevices(dev.devices || []);
        }

      } catch (err) {
        console.error(err);
        setError("Impossible de charger les données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="container mt-4">

      <h3>📁 Projets & Monitoring</h3>

      {/* ================= ENERGY SUMMARY ================= */}
      {solarman && (
        <div className="row my-3">

          <div className="col-md-4">
            <div className="card p-3 text-center shadow-sm">
              <h6>⚡ Puissance</h6>
              <h4>{solarman.power} W</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center shadow-sm">
              <h6>🔋 Aujourd’hui</h6>
              <h4>{solarman.energyToday} kWh</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 text-center shadow-sm">
              <h6>📊 Total</h6>
              <h4>{solarman.totalEnergy} kWh</h4>
            </div>
          </div>

        </div>
      )}

      {/* ================= DEVICES ================= */}
      {devices.length > 0 && (
        <div className="row mb-3">

          {devices.map((d) => (
            <div className="col-md-6 mb-2" key={d.id}>
              <div className="card p-2 shadow-sm">

                <strong>🔌 {d.name}</strong>

                <div className={d.status === "online" ? "text-success" : "text-danger"}>
                  {d.status}
                </div>

              </div>
            </div>
          ))}

        </div>
      )}

      {/* ================= ERROR ================= */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* ================= LOADING ================= */}
      {loading && <p>Chargement...</p>}

      {/* ================= EMPTY ================= */}
      {!loading && projets.length === 0 && (
        <div className="alert alert-warning">
          Aucun projet disponible
        </div>
      )}

      {/* ================= PROJECT LIST ================= */}
      <div className="row">

        {projets.map((p) => (
          <div className="col-12 col-md-6 col-lg-4 mb-3" key={p.id}>

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h5>⚡ {p.nom}</h5>

                <p className="text-muted">{p.description}</p>

                <div className="small text-secondary mb-2">
                  <div>📍 Client: {p.client || "N/A"}</div>
                  <div>⚙️ Statut: actif</div>
                  <div>🔋 Monitoring: disponible</div>
                </div>

                <div className="d-grid gap-2">

                  <Link to={`/rapport/${p.id}`} className="btn btn-primary btn-sm">
                    📊 Rapport
                  </Link>

                  <Link to={`/plan?project=${p.id}`} className="btn btn-outline-success btn-sm">
                    📍 Plan
                  </Link>

                  <Link to={`/dashboard/${p.id}`} className="btn btn-outline-dark btn-sm">
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

    </div>
  );
}

export default Projets;