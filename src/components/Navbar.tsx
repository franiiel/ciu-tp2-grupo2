import type { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "../styles/navbar.css";
import logoutIcon from "../assets/iconoSalir.png";
import logo from "../assets/logo.png";
import refresh from "../assets/iconoRefresh.png";
import { useAuth } from "../components/authContext";

const NavigationBar: FC = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();           // llama al método del context
    navigate("/login"); // redirige
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
          <img src={logoutIcon} alt="Logout" className="nav-icon" onClick={handleLogout} style={{ cursor: "pointer" }} />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
