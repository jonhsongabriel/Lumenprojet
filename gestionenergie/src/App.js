// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import API_URL from "./config/api";
import Login from "./Login";
import Register from "./Register";

// Pages
import Dashboard from "./pages/Dashboard";
import Monitor from "./pages/Monitor";
import Analysis from "./pages/Analysis";
import Operation from "./pages/Operation";
import Request from "./pages/Request";
import Management from "./pages/Management";
import Administrateur from "./pages/Administrateur";
import Client from "./pages/Client";
import Technicien from "./pages/Technicien";
import Alertes from "./pages/Alertes";
import Appareils from "./pages/Appareil";
import Centrale from "./pages/Centrale";
import Demande from "./pages/Demande";
import Direction from "./pages/Direction";
import Journal from "./pages/Journal";
import Plan from "./pages/Plan";
import Rapport from "./pages/Rapport";
import AjouterProjet from "./pages/AjouterProjet";
import Projets from "./pages/Projets"; // <- Import ajouté pour éviter l'erreur

import "leaflet/dist/leaflet.css";

function App() {
  const token = localStorage.getItem("token");

  // 🔹 Vérification du backend
  useEffect(() => {
    const testBackend = async () => {
      try {
        const res = await fetch(`${API_URL}/test`);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();
        console.log("Backend OK :", data);
      } catch (err) {
        console.error("Erreur backend :", err.message || err);
      }
    };
    testBackend();
  }, []);

  // 🔹 Gestion de la connexion
  const isAuthenticated = !!token;

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />

        <div className="d-flex flex-grow-1">
          <main className="flex-grow-1 p-3 mt-5">
            <Routes>

                  {/* 🔓 PUBLIC */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* 🔐 PRIVÉ */}
                  <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />

                  <Route path="/monitor" element={isAuthenticated ? <Monitor /> : <Navigate to="/login" />} />
                  <Route path="/monitor/alertes" element={isAuthenticated ? <Alertes /> : <Navigate to="/login" />} />
                  <Route path="/monitor/rapport" element={isAuthenticated ? <Rapport /> : <Navigate to="/login" />} />
                  <Route path="/monitor/centrale" element={isAuthenticated ? <Centrale /> : <Navigate to="/login" />} />
                  <Route path="/monitor/appareil" element={isAuthenticated ? <Appareils /> : <Navigate to="/login" />} />

                  <Route path="/analysis" element={isAuthenticated ? <Analysis /> : <Navigate to="/login" />} />
                  <Route path="/analysis/demande" element={isAuthenticated ? <Demande /> : <Navigate to="/login" />} />
                  <Route path="/analysis/plan" element={isAuthenticated ? <Plan /> : <Navigate to="/login" />} />
                  <Route path="/analysis/journal" element={isAuthenticated ? <Journal /> : <Navigate to="/login" />} />

                  <Route path="/operation" element={isAuthenticated ? <Operation /> : <Navigate to="/login" />} />
                  <Route path="/request" element={isAuthenticated ? <Request /> : <Navigate to="/login" />} />

                  <Route path="/management" element={isAuthenticated ? <Management /> : <Navigate to="/login" />} />
                  <Route path="/gestion/administrateur" element={isAuthenticated ? <Administrateur /> : <Navigate to="/login" />} />
                  <Route path="/gestion/direction" element={isAuthenticated ? <Direction /> : <Navigate to="/login" />} />
                  <Route path="/gestion/client" element={isAuthenticated ? <Client /> : <Navigate to="/login" />} />
                  <Route path="/gestion/technicien" element={isAuthenticated ? <Technicien /> : <Navigate to="/login" />} />

                  <Route path="/ajouterprojet" element={isAuthenticated ? <AjouterProjet /> : <Navigate to="/login" />} />
                  <Route path="/projets" element={isAuthenticated ? <Projets /> : <Navigate to="/login" />} />

                  {/* FALLBACK */}
                  <Route path="*" element={<Navigate to="/login" />} />

              </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;



