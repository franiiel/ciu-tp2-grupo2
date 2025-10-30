import { Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login.css";

export default function Register() {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg login-card">
        <Card.Body>
          <Card.Title className="text-center mb-4 fs-4 fw-bold text-success">
            Crear Cuenta
          </Card.Title>

          <Form>
            <Form.Group className="mb-3" controlId="formNickName">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Elige tu nombre de usuario"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="*******"
                required
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="w-100 mt-2"
            >
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
