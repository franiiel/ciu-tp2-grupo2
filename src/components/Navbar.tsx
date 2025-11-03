import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";

function NavigationBar() {
  return (
    <Navbar expand="lg" className="custom-navbar py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">
          UnaHur <span>Anti-Social Net</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={NavLink} to="/" >
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/perfil">
              Perfil
            </Nav.Link>
            <Nav.Link as={NavLink} to="/crearPost">
              Publicar
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              Iniciar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
