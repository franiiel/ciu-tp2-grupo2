import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import logo from "../assets/logo.png"

const API_URL = "http://localhost:3001";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const usuarioHardcodeado = {
    id: 1,
    nick: "Franiel",
    email: "franiel@example.com",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/users`);
      const users = await res.json();

      // validar nick y contraseña fija
      
      const foundUser =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        users.find((u: any) => u.nickName === nickName) ||
        (nickName === usuarioHardcodeado.nick ? usuarioHardcodeado : null);
      
        if (!foundUser) {
        setError("Usuario no encontrado");
        return;
      }

      if (password !== "123456") {
        setError("Contraseña incorrecta");
        return;
      }

      login(foundUser);
      navigate("/");
    } catch {
      setError("Error al conectar con la API");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg login-card">
        <Card.Body>
          <div className="text-center mb-3">
            <img src={logo} alt="Logo" className="login-logo" />
          </div>

          <Card.Title className="text-center mb-4 fs-4 fw-bold text-success">
            Iniciar Sesión
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNickName">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-2">
              Iniciar Sesión
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span>¿No tenés cuenta? </span>
            <Link
              to="/registrarse"
              className="text-success fw-semibold text-decoration-none"
            >
              Registrate acá
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
