import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

function Journal() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // 🔥 simulation des activités (plus tard backend)
    const fakeLogs = [
      { id: 1, action: "Création projet Mahajanga", date: "2026-04-17 10:00" },
      { id: 2, action: "Modification projet Antananarivo", date: "2026-04-17 10:30" },
      { id: 3, action: "Connexion utilisateur admin", date: "2026-04-17 11:00" },
      { id: 4, action: "Rapport généré projet 1", date: "2026-04-17 11:20" },
    ];

    setLogs(fakeLogs);
  }, []);

  return (
    <MainLayout>
      <div className="container">

        <h2>📜 Journal des activités</h2>
        <p className="text-muted">
          Historique des actions du système
        </p>

        <div className="card mt-3 shadow-sm">

          <div className="card-body">

            {logs.length === 0 ? (
              <p>Aucune activité disponible</p>
            ) : (
              <ul className="list-group">

                {logs.map((log) => (
                  <li
                    key={log.id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>{log.action}</span>
                    <small className="text-muted">{log.date}</small>
                  </li>
                ))}

              </ul>
            )}

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Journal;