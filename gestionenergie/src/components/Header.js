import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Speedometer2,
  GraphUp,
  BarChart,
  ListCheck,
  Gear,
  Envelope,
  Bell,
  PersonCircle,
} from "react-bootstrap-icons";

function Header() {
  const [openAnalyse, setOpenAnalyse] = useState(false);
  const [openGestion, setOpenGestion] = useState(false);
  const [nbAlertes, setNbAlertes] = useState(0);
  const [nbDemandes, setNbDemandes] = useState(0);

  // URL du backend
  const BASE_URL = "http://localhost:5000/api/lumen";

 useEffect(() => {
  const fetchDemandes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/lumen/demande");
      const data = await res.json();
      setNbDemandes(data.length); // Ici tu obtiens bien 6
    } catch (err) {
      console.error("Erreur fetch demandes:", err);
      setNbDemandes(0);
    }
  };
  fetchDemandes();
}, []);

useEffect(() => {
  const fetchAlertes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/lumen/alertes");
      const data = await res.json();
      setNbAlertes(data.length);
    } catch (err) {
      console.error("Erreur fetch alertes:", err);
      setNbAlertes(0);
    }
  };
  fetchAlertes();
}, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      className="shadow-sm px-3"
      style={{ height: "70px", zIndex: 1000 }}
    >
      <Container fluid className="d-flex align-items-center">
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
          <img
            src="/images/logo-lumen-vert.png"
            alt="Logo"
            style={{ width: "110px", height: "auto", objectFit: "contain", marginTop: "2px" }}
          />
        </Navbar.Brand>

        {/* BOUTON MOBILE */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* NAVIGATION PRINCIPALE */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto d-flex align-items-center">
            <Nav.Link as={Link} to="/" className="text-light fw-semibold d-flex align-items-center mx-2">
              <Speedometer2 size={16} className="me-1" /> Tableau de bord
            </Nav.Link>

            <Nav.Link as={Link} to="/monitor" className="text-light fw-semibold d-flex align-items-center mx-2">
              <GraphUp size={16} className="me-1" /> Moniteur
            </Nav.Link>

            <NavDropdown
              title={
                <span className="d-flex align-items-center text-light">
                  <BarChart size={16} className="me-1" /> Analyse
                </span>
              }
              id="nav-analyse"
              menuVariant="dark"
              className="mx-2 d-flex align-items-center"
              show={openAnalyse}
              onMouseEnter={() => setOpenAnalyse(true)}
              onMouseLeave={() => setOpenAnalyse(false)}
              drop="down-centered"
            >
              <NavDropdown.Item as={Link} to="/analysis/demande">Demande de service</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/analysis/plan">Plan</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/analysis/journal">Journal de maintenance</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/request" className="text-light fw-semibold d-flex align-items-center mx-2">
              <ListCheck size={16} className="me-1" /> Demande
            </Nav.Link>

            <NavDropdown
              title={
                <span className="d-flex align-items-center text-light">
                  <Gear size={16} className="me-1" /> Utilisateur
                </span>
              }
              id="nav-utilisateur"
              menuVariant="dark"
              className="mx-2 d-flex align-items-center"
              show={openGestion}
              onMouseEnter={() => setOpenGestion(true)}
              onMouseLeave={() => setOpenGestion(false)}
              drop="down-centered"
            >
              <NavDropdown.Item as={Link} to="/gestion/administrateur">Administrateur</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gestion/direction">Direction</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gestion/technicien">Technicien</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/gestion/client">Client</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {/* ICONES A DROITE */}
          <Nav className="d-flex align-items-center gap-3 ms-lg-4">
            <Nav.Link
              as={Link}
              to="/request"
              className="p-0"
              style={{ position: "relative", display: "flex", alignItems: "center" }}
            >
              <Envelope size={20} color="white" />
              {nbDemandes > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    lineHeight: "1",
                  }}
                >
                  {nbDemandes}
                </span>
              )}
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/monitor/alertes"
              className="p-0"
              style={{ position: "relative", display: "flex", alignItems: "center" }}
            >
              <Bell size={20} color="white" />
              {nbAlertes > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "12px",
                    lineHeight: "1",
                  }}
                >
                  {nbAlertes}
                </span>
              )}
            </Nav.Link>

            <Nav.Link href="#" className="p-0">
              <PersonCircle size={22} color="white" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .navbar-nav .nav-link,
        .navbar-nav .nav-item .dropdown-toggle {
          display: flex;
          align-items: center;
          height: 100%;
        }
      `}</style>
    </Navbar>
  );
}

export default Header;