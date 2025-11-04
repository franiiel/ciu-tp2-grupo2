// src/pages/Inicio.tsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { getPublicaciones } from "../components/GetPost";
import type { Publicacion } from "../components/types";

import "../styles/inicio.css";

export default function Inicio() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPublicaciones()
      .then((data) => setPublicaciones(data))
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center mt-5">
        {error}
      </Alert>
    );
  }

  return (
    <Container className="inicio-container mt-4">
      <h3 className="inicio-titulo mb-4">Publicaciones Recientes</h3>
      <Row>
        {publicaciones.length > 0 ? (
          publicaciones.map((post) => (
            <Col key={post.id} md={6} lg={4} className="mb-4">
              <PostCard
                id={post.id}
                description={post.description}
                images={post.Images?.map((img) => img.imageUrl)}
                tags={post.Tags?.map((tag, index) => ({
                  id: index,
                  name: tag.name,
                }))}
                commentCount={post.Comments ? post.Comments.length : 0}
              />
            </Col>
          ))

        ) : (
          <p className="text-center">No hay publicaciones disponibles.</p>
        )}
      </Row>
    </Container>
  );
}