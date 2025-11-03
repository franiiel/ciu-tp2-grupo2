import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";
import logout from "../assets/iconoSalir.png";
import logo from "../assets/logo.png";
import refresh from "../assets/iconoRefresh.png";

const NavigationBar: FC = () => {
  const navigate = useNavigate();

  //logout falta hacer
  const handleLogout = () => {
    // lógica de cerrar sesión
    console.log("Salir");
    navigate("/login"); //redirigir a login
  };

  //refresh falta hacer
  const handleRefresh = () => {
    window.location.reload(); // recarga la página
  };

  return (
    <Navbar expand="lg" className="custom-navbar py-3 shadow-sm fixed-top">
      <Container  className="d-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/" className="brand-text d-flex align-items-center">
          <img src={logo} alt="Logo" className="logo-img" /> 
          UnaHur <span>Anti-Social Net</span>
        </Navbar.Brand>

        <Nav className="navbar-icons d-flex align-items-center">
          <img src={refresh} alt="Refresh" className="nav-icon me-3" onClick={handleRefresh} style={{ cursor: "pointer" }} />
          <img src={logout} alt="Logout" className="nav-icon" onClick={handleLogout} style={{ cursor: "pointer" }} />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
