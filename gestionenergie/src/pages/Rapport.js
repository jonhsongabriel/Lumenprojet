import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../config/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function Rapport() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/lumen/rapports/${id}`);
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, [id]);

  if (!data) return <p>Chargement...</p>;

  const chartData = {
    labels: ["J1", "J2", "J3", "J4", "J5"],
    datasets: [
      {
        label: "Production",
        data: data.production,
        borderColor: "green",
      },
      {
        label: "Consommation",
        data: data.consumption,
        borderColor: "red",
      },
      {
        label: "Batterie",
        data: data.battery,
        borderColor: "blue",
      },
    ],
  };

  return (
    <div className="container mt-4">

      <h3>Rapport - {data.name}</h3>

      <div className="card p-3">
        <Line data={chartData} />
      </div>

    </div>
  );
}

export default Rapport;