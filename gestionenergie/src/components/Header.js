import React, { useState } from "react";
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
  const [openMonitor, setOpenMonitor] = useState(false);
  const [openAnalyse, setOpenAnalyse] = useState(false);
  const [openGestion, setOpenGestion] = useState(false);

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
        {/* --- LOGO --- */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
          <img
            src="/images/logo-lumen-vert.png"
            alt="Logo"
            style={{
              width: "110px",
              height: "auto",
              objectFit: "contain",
              marginTop: "2px",
            }}
          />
        </Navbar.Brand>

        {/* --- BOUTON MOBILE --- */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* --- NAVIGATION PRINCIPALE --- */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto d-flex align-items-center">

            {/* Tableau de bord */}
            <Nav.Link
              as={Link}
              to="/"
              className="text-light fw-semibold d-flex align-items-center mx-2"
            >
              <Speedometer2 size={16} className="me-1" /> <span>Tableau de bord</span>
            </Nav.Link>

            {/* Moniteur */}
            <NavDropdown
              title={
                <span className="d-flex align-items-center text-light">
                  <GraphUp size={16} className="me-1" /> Moniteur
                </span>
              }
              id="nav-monitor"
              menuVariant="dark"
              className="mx-2 d-flex align-items-center"
              show={openMonitor}
              onMouseEnter={() => setOpenMonitor(true)}
              onMouseLeave={() => setOpenMonitor(false)}
              drop="down-centered"
            >
              <NavDropdown.Item as={Link} to="/monitor/centrale">Centrale</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/monitor/appareil">Appareil</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/monitor/alertes">Alertes</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/monitor/rapport">Rapport et comparaison</NavDropdown.Item>
            </NavDropdown>

            {/* Analyse */}
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

            {/* Demande */}
            <Nav.Link
              as={Link}
              to="/request"
              className="text-light fw-semibold d-flex align-items-center mx-2"
            >
              <ListCheck size={16} className="me-1" /> <span>Demande</span>
            </Nav.Link>

            {/* Utilisateur */}
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

          {/* --- ICONES A DROITE --- */}
          <Nav className="d-flex align-items-center gap-3 ms-lg-4">
            <Nav.Link href="#" className="p-0">
              <Envelope size={20} color="white" />
            </Nav.Link>
            <Nav.Link href="#" className="p-0">
              <Bell size={20} color="white" />
            </Nav.Link>
            <Nav.Link href="#" className="p-0">
              <PersonCircle size={22} color="white" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* --- CSS INLINE POUR ALIGNEMENT --- */}
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
