import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import PostCard from "../components/PostCard";



export default function Inicio() {


  // ejemplos para mostrar en la página de inicio, esto tiene que salir de consulta con API
  const posts = [
    {
      id: 1,
      description: "Hoy probé la red UnaHur Anti-Social Net y fue lo mejor del día 😂",
      images: ["https://picsum.photos/400/200?random=1"],
      tags: [{ id: 1, name: "humor" }, { id: 2, name: "unahur" }],
      commentCount: 0,
    },
    {
      id: 2,
      description: "No hay nada más anti-social que hacer scroll infinito en paz 😌",
      images: [],
      tags: [{ id: 3, name: "paz" }],
      commentCount: 1,
    },
  ];

  return (
    <Container className="my-4">
      <h3 className="mb-4 text-success"> Publicaciones Recientes </h3>
      <Row>
        {posts.map((post) => (
          <Col md={6} lg={4}>
            <PostCard {...post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}