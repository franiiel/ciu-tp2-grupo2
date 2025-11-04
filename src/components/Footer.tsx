
import { Container, Row, Col } from "react-bootstrap";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <Container>
        <Row>
            <Col>
                <h5 className="fw-bold text-success">UnaHur Anti-Social Net</h5>
                <p className="mb-0 text-muted">
                    Manteniendo a las personas a salvo de la socialización 😎
                </p>
            </Col>
        </Row>

        <Row>
            <Col className="mt-3">
                <small className="text-secondary">
                © {new Date().getFullYear()} UnaHur Anti-Social Net. Todos los derechos reservados.
                </small>
            </Col>
        </Row>

      </Container>
    </footer>
  );
}
