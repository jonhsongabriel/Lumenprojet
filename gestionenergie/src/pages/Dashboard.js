import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import MainLayout from "../layouts/MainLayout";

function Dashboard() {

  const [projets, setProjets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/projets`);

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API error ${res.status}: ${text}`);
        }

        const data = await res.json();
        setProjets(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error(err);
        setError(err.message || "Impossible de charger les projets");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  if (loading) {
    return (
      <MainLayout>
        <p>⏳ Chargement des projets...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="mb-3">
        <h3>📊 Tableau de bord énergie</h3>
        <p className="text-muted">Supervision des sites solaires en temps réel</p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && projets.length === 0 && (
        <div className="alert alert-warning">
          Aucun projet disponible
        </div>
      )}

      <div className="row">

        {projets.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-3" key={p.id}>

            <div className="card shadow-sm h-100 border-0">

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
                    📊 Rapport & Production
                  </Link>

                  <Link to={`/plan?project=${p.id}`} className="btn btn-outline-success btn-sm">
                    📍 Localisation
                  </Link>

                  <Link to={`/analyse/${p.id}`} className="btn btn-outline-dark btn-sm">
                    📈 Courbes & Analyse
                  </Link>

                  <Link to={`/alertes/${p.id}`} className="btn btn-outline-danger btn-sm">
                    🚨 Alertes & Erreurs
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