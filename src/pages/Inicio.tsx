import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import PostCard from "../components/PostCard";
import "./Inicio.css";



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
    {
      id: 3,
      description: "Me conecté a UnaHur Anti-Social Net desde el aula y terminé hablando con nadie. 10/10 experiencia 🫠",
      images: ["https://picsum.photos/400/200?random=3"],
      tags: [{ id: 4, name: "unahur" }, { id: 5, name: "soledad" }],
      commentCount: 2,
    },
    {
      id: 4,
      description: "Publicar sin esperar likes es el nuevo lujo digital ✨",
      images: [],
      tags: [{ id: 6, name: "reflexión" }, { id: 7, name: "minimalismo" }],
      commentCount: 0,
    },
    {
      id: 5,
      description: "Hoy vi una publicación que decía 'no interactúes' y me sentí vista 👀",
      images: ["https://picsum.photos/400/200?random=5"],
      tags: [{ id: 8, name: "humor" }, { id: 9, name: "antisocial" }],
      commentCount: 4,
    },
    {
      id: 6,
      description: "La red UnaHur Anti-Social Net me dejó publicar sin culpa. ¿Esto es libertad? 😌",
      images: ["https://picsum.photos/400/200?random=6"],
      tags: [{ id: 10, name: "unahur" }, { id: 11, name: "libertad" }],
      commentCount: 1,
    },
    {
      id: 7,
      description: "Scroll, café, y cero interacciones. Mi tipo de mañana ☕",
      images: [],
      tags: [{ id: 12, name: "rutina" }, { id: 13, name: "antisocial" }],
      commentCount: 3,
    }

  ];

  return (
    <Container className="inicio-container">
      <h3 className="inicio-titulo">Publicaciones Recientes</h3>
      <Row className="inicio-posts">
        {posts.map((post) => (
          <Col key={post.id} md={6} lg={4} className="inicio-post-col">
            <PostCard {...post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}