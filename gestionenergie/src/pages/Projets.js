import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";

function Projets() {

  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/projets`);

        if (!res.ok) {
          throw new Error("Erreur chargement projets");
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
    <div className="container mt-4">

      <h3>📁 Projets & Monitoring</h3>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {loading && <p>Chargement...</p>}

      {!loading && projets.length === 0 && (
        <div className="alert alert-warning">
          Aucun projet disponible
        </div>
      )}

      <div className="row">

        {projets.map((p) => (
          <div className="col-12 col-md-6 col-lg-4 mb-3" key={p.id}>

            <div className="card shadow-sm">

              <div className="card-body">

                <h5>⚡ {p.nom}</h5>

                <p className="text-muted">{p.description}</p>

                <div className="small text-secondary mb-2">
                  <div>📍 Client: {p.client || "N/A"}</div>
                  <div>⚙️ Statut: actif</div>
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