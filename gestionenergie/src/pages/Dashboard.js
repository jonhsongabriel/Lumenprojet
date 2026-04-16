import React, { useEffect, useState } from "react";
import API_URL from "../config/api";

export default function Dashboard() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/projets`);

        if (!res.ok) {
          throw new Error("Erreur API: " + res.status);
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

    fetchProjets();
  }, []);

  const getRandomStatus = () => {
    const r = Math.random();
    if (r > 0.7) return { label: "Alerte", className: "bg-danger" };
    if (r > 0.4) return { label: "Maintenance", className: "bg-warning" };
    return { label: "Opérationnel", className: "bg-success" };
  };

  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <div className="text-center mb-4">
          <img
            src="/images/logo-lumen-vert.png"
            alt="Lumen"
            style={{ width: "100px" }}
          />
          <h5 className="mt-2">LUMEN</h5>
        </div>

        <ul className="nav flex-column">

          <li className="nav-item mb-3">
            <a href="/dashboard" className="text-white text-decoration-none">
              Tableau de bord
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="#" className="text-white text-decoration-none">
              Supervision
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="#" className="text-white text-decoration-none">
              Historique
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="#" className="text-white text-decoration-none">
              Configuration
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="#" className="text-white text-decoration-none">
              Utilisateurs
            </a>
          </li>

          <li className="nav-item mb-3">
            <a href="#" className="text-white text-decoration-none">
              Notifications
            </a>
          </li>

          <li className="nav-item mt-4">
            <a href="/ajouterprojet" className="btn btn-success w-100">
              Ajouter projet
            </a>
          </li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-grow-1 p-4 bg-light">

        <h3 className="mb-4">Tableau de bord</h3>

        {/* ERROR */}
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        {/* STATS */}
        <div className="row mb-4">

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Sites totaux</h6>
              <h3>{projets.length}</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Production totale</h6>
              <h3>{projets.length * 80} kW</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Capacité installée</h6>
              <h3>{projets.length * 150} kW</h3>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-3 text-center">
              <h6>Alertes</h6>
              <h3 className="text-danger">
                {projets.length > 2 ? 2 : 0}
              </h3>
            </div>
          </div>

        </div>

        {/* LISTE */}
        <div className="row">

          {loading && (
            <p>Chargement des projets...</p>
          )}

          {!loading && projets.length === 0 && (
            <p>Aucun projet disponible</p>
          )}

          {projets.map((projet) => {
            const status = getRandomStatus();

            return (
              <div className="col-md-4 mb-4" key={projet.id}>

                <div className="card shadow-sm">

                  {projet.image && (
                    <img
                      src={projet.image}
                      alt={projet.nom}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">

                    <h5>{projet.nom}</h5>

                    <p>
                      {projet.description
                        ? projet.description.slice(0, 60)
                        : "Pas de description"}
                      ...
                    </p>

                    <p>
                      <strong>Production:</strong>{" "}
                      {Math.floor(Math.random() * 100)} kW
                    </p>

                    <p>
                      <strong>Batterie:</strong>{" "}
                      {Math.floor(Math.random() * 100)}%
                    </p>

                    <span className={`badge ${status.className}`}>
                      {status.label}
                    </span>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}