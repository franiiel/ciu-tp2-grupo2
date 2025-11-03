import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";


export default function NuevaPublicacion() {
  const navigate = useNavigate();

  // Estados locales
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [idUser, setIdUser] = useState<number>(1); //Provisorio (hasta tener login)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Manejar cambios en los campos de imagen
  const handleImageChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  // Agregar campo de imagen
  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  // Quitar campo de imagen
  const removeImageField = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  // Enviar formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      setMessage("La descripción es obligatoria.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3050/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUser,
          description,
          imageUrls: imageUrls.filter((url) => url.trim() !== ""),
        }),
      });

      if (!res.ok) throw new Error("Error al crear publicación");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data:JSON = await res.json();

      setMessage("Publicación creada con éxito!");
      setTimeout(() => navigate("/usuario"), 1500); // Redirige al perfil o inicio
    } catch (error) {
      console.error(error);
      setMessage("Error al crear publicación.");
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
