import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import { useAuth } from "../components/AuthContext";

const API_URL = "http://localhost:3001";

type Tag = {
  id: number;
  name: string;
};

export default function NuevaPublicacion() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  //Obtener etiquetas al cargar
  useEffect(() => {
    fetch(`${API_URL}/tags`)
      .then((res) => res.json())
      .then((data: Tag[]) => setTags(data))
      .catch((err) => console.error("Error al obtener etiquetas:", err));
  }, []);

  const handleImageChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageField = () => setImageUrls([...imageUrls, ""]);
  const removeImageField = (index: number) =>
    setImageUrls(imageUrls.filter((_, i) => i !== index));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setMessage("La descripción es obligatoria.");
      return;
    }

    if (!user) {
      setMessage("Debés iniciar sesión para publicar.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      //Crear post
      const resPost = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          userId: user.id,
          tagIds: selectedTagIds,
        }),
      });

      if (!resPost.ok) throw new Error("Error al crear la publicación");
      const postCreado = await resPost.json();

      //Si hay imágenes, crear cada una
      const urls = imageUrls.filter((url) => url.trim() !== "");
      for (const url of urls) {
        await fetch(`${API_URL}/postimages`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            postId: postCreado.id,
          }),
        });
      }

      setMessage("Publicación creada con éxito!");
      setTimeout(() => navigate("/usuario"), 1500);
    } catch (error) {
      console.error(error);
      setMessage("Error al crear la publicación.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 shadow-sm mx-auto mt-4" style={{ maxWidth: "600px" }}>
      <h3 className="mb-4 text-center">Crear Nueva Publicación</h3>

      <Form onSubmit={handleSubmit}>
        {/* Descripción */}
        <Form.Group className="mb-3">
          <Form.Label>Descripción *</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribí algo interesante..."
          />
        </Form.Group>

        {/* Etiquetas */}
        <Form.Group className="mb-3">
          <Form.Label>Etiquetas (opcional)</Form.Label>
          <div>
            {tags.map((tag) => (
              <Form.Check
                key={tag.id}
                type="checkbox"
                label={tag.name}
                checked={selectedTagIds.includes(tag.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTagIds([...selectedTagIds, tag.id]);
                  } else {
                    setSelectedTagIds(selectedTagIds.filter((id) => id !== tag.id));
                  }
                }}
              />
            ))}
          </div>
        </Form.Group>

        {/* URLs de Imágenes */}
        <Form.Label>URLs de Imágenes (opcional)</Form.Label>
        {imageUrls.map((url, i) => (
          <div key={i} className="d-flex align-items-center mb-2">
            <Form.Control
              type="text"
              value={url}
              onChange={(e) => handleImageChange(i, e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {imageUrls.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-2"
                onClick={() => removeImageField(i)}
              >
                X
              </Button>
            )}
          </div>
        ))}
        <Button variant="outline-primary" size="sm" onClick={addImageField}>
          + Agregar otra imagen
        </Button>

        {/* Botón enviar */}
        <div className="text-center mt-4">
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Publicando..." : "Publicar"}
          </Button>
        </div>
      </Form>

      {message && <p className="mt-3 text-center">{message}</p>}
    </Card>
  );
}
