import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

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



function App() {

  // --- Test Backend LUMEN ---
  useEffect(() => {
    fetch("http://localhost:3000/api/test") // ton backend local
      .then(res => res.json())
      .then(data => console.log("Réponse backend :", data))
      .catch(err => console.error("Erreur backend :", err));
  }, []);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Header en haut */}
        <Header />

        {/* Contenu principal avec Sidebar */}
        <div className="d-flex flex-grow-1">
          <main className="flex-grow-1 p-3 mt-5">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/monitor" element={<Monitor />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/analysis/demande" element={<Demande />} />
              <Route path="/analysis/plan" element={<Plan />} />
              <Route path="/analysis/journal" element={<Journal />} />
              <Route path="/operation" element={<Operation />} />
              <Route path="/request" element={<Request />} />
              <Route path="/management" element={<Management />} />
              <Route path="/gestion/administrateur" element={<Administrateur />} />
              <Route path="/gestion/direction" element={<Direction />} />
              <Route path="/gestion/client" element={<Client />} />
              <Route path="/gestion/technicien" element={<Technicien/>} />
              <Route path="/monitor/alertes" element={<Alertes/>} />
              <Route path="/monitor/rapport" element={<Rapport/>} />
              <Route path="/monitor/centrale" element={<Centrale/>} />
              <Route path="/monitor/appareil" element={<Appareils/>} />
              
            </Routes>
          </main>
        </div>
         <Footer /> 
      </div>
    </Router>
  );
}

export default App;
