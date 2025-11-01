import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

type Usuario = {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function Registrarse() {
  const [nickName, setNickName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess("");

    if (!nickName || !firstName || !lastName || !email || !password) {
      setError("Por favor, completá todos los campos.");
      return;
    }

    if (password !== "123456") {
      setError('La contraseña debe ser exactamente "123456".');
      return;
    }

    const nuevoUsuario: Usuario = { nickName, firstName, lastName, email, password };

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear el usuario");
        return res.json();
      })
      .then((usuarioCreado: Usuario) => {
        console.log("Usuario creado:", usuarioCreado);
        setSuccess("Usuario registrado correctamente. Redirigiendo al login...");
        setTimeout(() => navigate("/login"), 1500);
      })
      .catch((e: any) => setError(e.message));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg login-card">
        <Card.Body>
          <Card.Title className="text-center mb-4 fs-4 fw-bold text-success">
            Crear Cuenta
          </Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Elige tu nombre de usuario"
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder='Debe ser "123456"'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100">
              Registrarse
            </Button>
          </Form>

          <div className="text-center mt-3">
            <span>¿Ya tenés cuenta? </span>
            <Link to="/login" className="text-success fw-semibold text-decoration-none">
              Iniciá sesión
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

