import { Container, Card, Form, Button, Alert } from 'react-bootstrap'
import './login.css'
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import { useAuth } from "../components/authContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/users");
      const users = await res.json();

      // validar nick y contraseña fija
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundUser = users.find((u: any) => u.nickName === nickName);

      if (!foundUser) {
        setError("Usuario no encontrado");
        return;
      }

      if (password !== "123456") {
        setError("Contraseña incorrecta");
        return;
      }

      login(foundUser);
    } catch {
      setError("Error al conectar con la API");
    }
  };

  return (
     <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg login-card">
        <Card.Body>
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

            <Button
              variant="success"
              type="submit"
              className="w-100 mt-2"
            >
              Iniciar Sesión
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span>¿No tenés cuenta? </span>
            <Link to="/registrarse" className="text-success fw-semibold text-decoration-none">
              Registrate acá
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
