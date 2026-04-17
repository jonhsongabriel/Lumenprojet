import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Facebook, Twitter, Instagram, Linkedin } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Footer() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  // permissions
  const isClient = role === "client";
  const isStaff = ["admin", "ingenieur", "technicien"].includes(role);

  return (
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto">
      <Container>
        <Row>

          {/* --- MENU --- */}
          <Col md={4} className="mb-3">
            <h5>Menu</h5>

            <Nav className="flex-column">

              {/* Accueil (tout le monde connecté) */}
              <Nav.Link as={Link} to="/" className="text-light p-0 mb-1">
                Accueil
              </Nav.Link>

              {/* MONITEUR (staff seulement) */}
              {isStaff && (
                <Nav.Link as={Link} to="/monitor/centrale" className="text-light p-0 mb-1">
                  Moniteur
                </Nav.Link>
              )}

              {/* ANALYSE (staff seulement) */}
              {isStaff && (
                <Nav.Link as={Link} to="/analyse/service" className="text-light p-0 mb-1">
                  Analyse
                </Nav.Link>
              )}

              {/* DEMANDE (client + staff mais peut être limité) */}
              {token && (
                <Nav.Link as={Link} to="/request" className="text-light p-0 mb-1">
                  Demande
                </Nav.Link>
              )}

            </Nav>
          </Col>

          {/* --- CONTACT --- */}
          <Col md={4} className="mb-3">
            <h5>Contact</h5>
            <p className="mb-1">
              Email: <a href="mailto:support@lumen.com" className="text-light">support@lumen.com</a>
            </p>
            <p className="mb-1">
              Tel: <a href="tel:+261341234567" className="text-light">+261 34 12 345 67</a>
            </p>

            <div className="d-flex gap-2 mt-2">
              <a href="#" className="text-light"><Facebook size={20} /></a>
              <a href="#" className="text-light"><Twitter size={20} /></a>
              <a href="#" className="text-light"><Instagram size={20} /></a>
              <a href="#" className="text-light"><Linkedin size={20} /></a>
            </div>
          </Col>

          {/* --- ADRESSE --- */}
          <Col md={4} className="mb-3">
            <h5>Adresse</h5>
            <p>Andranobevava Tranofitaratra, Antananarivo, Madagascar</p>
            <p>BP 101, Antananarivo 101</p>
          </Col>

        </Row>

        <hr className="bg-light" />

        <Row>
          <Col className="text-center">
            <small>&copy; 2025 Lumen. Tous droits réservés.</small>
          </Col>
        </Row>

      </Container>
    </footer>
  );
}

export default Footer;