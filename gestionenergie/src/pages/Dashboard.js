import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api";
import MainLayout from "../layouts/MainLayout";

function Dashboard() {

  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/lumen/projets`)
      .then(res => res.json())
      .then(data => setProjets(data || []))
      .catch(err => console.error(err));
  }, []);

  return (
    <MainLayout>
      <h3>📊 Projets Energie</h3>

      <div className="row mt-3">

        {projets.map(p => (
          <div className="col-md-4 mb-3" key={p.id}>

            <div className="card shadow-sm">

              <img
                src="https://source.unsplash.com/400x200/?solar,energy"
                className="card-img-top"
              />

              <div className="card-body">

                <h5>{p.nom}</h5>
                <p>{p.description}</p>

                <Link
                  className="btn btn-primary w-100"
                  to={`/projet/${p.id}`}
                >
                  Ouvrir
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>
    </MainLayout>
  );
}

export default Dashboard;