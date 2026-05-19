import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../config/api";

function ProjetView() {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {

    const fetchLive = async () => {
      const res = await fetch(`${API_URL}/api/lumen/centrale/${id}/live`);
      const json = await res.json();
      setData(json);
    };

    fetchLive();

    const interval = setInterval(fetchLive, 5000);

    return () => clearInterval(interval);

  }, [id]);

  if (!data) return <p>Chargement...</p>;

  return (
    <div className="container mt-4">

      <h3>⚡ {data.nom}</h3>

      <span className={data.status === "online" ? "text-success" : "text-warning"}>
        {data.status}
      </span>

      <div className="card p-3 mt-3">

        <p>Voltage: {data.data.voltage.toFixed(1)} V</p>
        <p>Current: {data.data.current.toFixed(2)} A</p>
        <p>Power: {Math.round(data.data.power)} W</p>

      </div>

    </div>
  );
}

export default ProjetView;