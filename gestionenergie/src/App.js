import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import Dashboard from "./pages/Dashboard";
import Projets from "./pages/Projets";
import AjouterProjet from "./pages/AjouterProjet";
import Rapport from "./pages/Rapport";
import Journal from "./pages/Journal";
import Plan from "./pages/Plan";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token"));

  React.useEffect(() => {
    const syncToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", syncToken);
    return () => window.removeEventListener("storage", syncToken);
  }, []);

  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" />} />

        {/* PRIVATE */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/projets" element={<PrivateRoute><Projets /></PrivateRoute>} />
        <Route path="/ajouterprojet" element={<PrivateRoute><AjouterProjet /></PrivateRoute>} />
        <Route path="/rapport/:id" element={<PrivateRoute><Rapport /></PrivateRoute>} />
        <Route path="/journal" element={<PrivateRoute><Journal /></PrivateRoute>} />
        <Route path="/plan" element={<PrivateRoute><Plan /></PrivateRoute>}
/>

        {/* ROOT */}
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </Router>
  );
}

export default App;