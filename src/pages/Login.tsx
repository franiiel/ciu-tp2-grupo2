import { Container, Card, Form, Button } from 'react-bootstrap'
import './login.css'

export default function Login() {

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg login-card">
        <Card.Body>
          <Card.Title className="text-center mb-4 fs-4 fw-bold text-success">
            Iniciar Sesión
          </Card.Title>

          <Form >
            <Form.Group className="mb-3" controlId="formNickName">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu usuario"
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
              Iniciar Sesión
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}