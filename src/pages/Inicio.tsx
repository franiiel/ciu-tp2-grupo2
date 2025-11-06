// src/pages/Inicio.tsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import PostCard from "../components/PostCard";
import { getCommentsByPostId, getImagesByPostId, getPublicaciones } from "../components/GetPost";
import type { Publicacion } from "../components/types";

import "../styles/inicio.css";

type PublicacionConExtras = Publicacion & {
  Images?: { imageUrl: string }[];
  commentCount?: number;
};
export default function Inicio() {
  const [publicaciones, setPublicaciones] = useState<PublicacionConExtras[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const posts = await getPublicaciones();
      const shuffled = posts.sort(() => Math.random() - 0.5);
      const postsWithExtras = await Promise.all(
        shuffled.map(async (post) => {
          const [comments, images] = await Promise.all([
            getCommentsByPostId(post.id),
            getImagesByPostId(post.id),
          ]);
          return {
            ...post,
            commentCount: comments.length,
            Images: images.map((img) => ({ imageUrl: img.url })),
          };
        })
      );

      setPublicaciones(postsWithExtras);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
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
            <Col key={post.id} xs={12} className="mb-4">
              <PostCard
                id={post.id}
                description={post.description}
                images={post.Images?.map((img) => img.imageUrl)}
                tags={post.Tags?.map((tag, index) => ({
                  id: index,
                  name: tag.name,
                }))}
                commentCount={post.commentCount ?? 0}
              />
            </Col>
          ))
        ) : (
          <p className="text-center">No hay publicaciones disponibles.</p>
        )}
      </Row>

      <div className="text-center mt-3 fin-publicaciones">
        <p>
          🌀 <strong>Has llegado al final.</strong> Refresca la página para ver nuevas publicaciones.
        </p>
      </div>

    </Container>
  );
}
