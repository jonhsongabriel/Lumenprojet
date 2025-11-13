import React, { useEffect, useState } from "react";

function Dashboard() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/api/administrateurs")  // <-- ici le nouveau port
    .then((res) => res.json())
    .then((data) => setAdmins(data))
    .catch((err) => console.error(err));
}, []);


  return (
    <div>
      <h2>Liste des administrateurs</h2>
      <ul>
        {admins.map((a) => (
          <li key={a.id}>{a.nom} - {a.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
