import { Card, Button, Badge } from "react-bootstrap";
import "./postCard.css";


interface PostCardProps {
  id: number;
  description: string;
  images?: string[];
  tags?: { id: number; name: string }[];
  commentCount?: number;
}

export default function PostCard({
  // id, para dirigirse a la página del post 
  description,
  images = [],
  tags = [],
  commentCount = 0,
}: PostCardProps) {

  return (
    <Card className="post-card shadow-sm mb-4">
      {/* Imagen principal si existe */}
      {images.length > 0 && (
        <Card.Img
          variant="top"
          src={images[0]}
          alt="Imagen del post"
          className="post-card-img"
        />
      )}

      <Card.Body>
        {/* Descripción */}
        <Card.Text className="post-description">
          {description}
        </Card.Text>

        {/* Etiquetas */}
        <div className="mb-3">
          {tags.map((tag) => (
            <Badge key={tag.id} bg="success" className="me-1">
              #{tag.name}
            </Badge>
          ))}
        </div>

        {/* Comentarios */}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            💬 {commentCount} comentario{commentCount !== 1 && "s"}
          </small>

         {/* Botón Ver más */} 
          <Button
            variant="outline-success"
            size="sm"
          >
            Ver más →
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}