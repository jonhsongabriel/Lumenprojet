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

        // ✅ API SAFE (ne casse pas ton backend)
        const url = `${API_URL}/projets`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`API error ${res.status}`);
        }

        const data = await res.json();

        setProjets(Array.isArray(data) ? data : []);

      } catch (err) {
        console.error(err);
        setError("Impossible de charger les projets");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MainLayout>

      {/* HEADER */}
      <div className="mb-3">
        <h3>📊 Tableau de bord énergie</h3>
        <p className="text-muted">
          Supervision des sites solaires en temps réel
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && <p>Chargement...</p>}

      {/* EMPTY STATE */}
      {!loading && projets.length === 0 && (
        <div className="alert alert-warning">
          Aucun projet disponible
        </div>
      )}

      {/* GRID */}
      <div className="row">

        {projets.map((p) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-3" key={p.id}>

            <div className="card shadow-sm h-100 border-0">

              <div className="card-body">

                {/* TITLE */}
                <h5 className="mb-2">
                  ⚡ {p.nom || "Projet"}
                </h5>

                {/* DESCRIPTION */}
                <p className="text-muted">
                  {p.description || "Aucune description disponible"}
                </p>

                {/* INFOS SYSTEME */}
                <div className="small text-secondary mb-3">

                  <div>👤 Client : {p.client || "N/A"}</div>
                  <div>⚙️ Statut : actif</div>
                  <div>🔋 Monitoring : disponible</div>

                </div>

                {/* ACTIONS */}
                <div className="d-grid gap-2">

                  {/* 📊 RAPPORT */}
                  <Link
                    to={`/rapport/${p.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    📊 Rapport & Production
                  </Link>

                  {/* 📍 PLAN */}
                  <Link
                    to={`/plan?project=${p.id}`}
                    className="btn btn-outline-success btn-sm"
                  >
                    📍 Localisation
                  </Link>

                  {/* 📈 ANALYSE (future graph page) */}
                  <Link
                    to={`/analyse/${p.id}`}
                    className="btn btn-outline-dark btn-sm"
                  >
                    📈 Courbes & Analyse
                  </Link>

                  {/* 🚨 ALERTES */}
                  <Link
                    to={`/alertes/${p.id}`}
                    className="btn btn-outline-danger btn-sm"
                  >
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