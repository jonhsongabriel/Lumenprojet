import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-3">
      <Container>
        <Row>
          <Col md={6}>
            © 2025 Gestion Énergie
          </Col>
          <Col md={6} className="text-md-end">
            Contact: support@gestionenergie.com
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
