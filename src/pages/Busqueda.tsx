import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3001";

type Post = {
  id: number;
  description: string;
  User?: { nickName: string };
  Tags?: { name: string }[];
};

export default function Busqueda() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  //Cargar todos los posts una sola vez
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/posts`);
        if (!res.ok) throw new Error("Error al obtener posts");
        const data = await res.json();
        setPosts(data);
        setFiltered(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  //Manejar búsqueda local
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      setFiltered(posts);
      return;
    }

    const lower = search.toLowerCase();
    const results = posts.filter(
      (p) =>
        p.description.toLowerCase().includes(lower) ||
        p.User?.nickName?.toLowerCase().includes(lower) ||
        p.Tags?.some((t) => t.name.toLowerCase().includes(lower))
    );
    setFiltered(results);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Buscar publicaciones</h3>

      <Form className="d-flex mb-4" onSubmit={handleSearch}>
        <Form.Control
          type="text"
          placeholder="Buscar por descripción, usuario o etiqueta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="primary" type="submit" className="ms-2">
          Buscar
        </Button>
      </Form>

      {loading ? (
        <p className="text-center">Cargando publicaciones...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center">No se encontraron resultados.</p>
      ) : (
        <div className="row">
          {filtered.map((p) => (
            <div className="col-md-4 mb-3" key={p.id}>
              <Card>
                <Card.Body>
                  <Card.Text>{p.description}</Card.Text>
                  <small className="text-muted">
                    {p.User?.nickName ? `@${p.User.nickName}` : "Sin autor"}
                  </small>
                  {p.Tags && p.Tags.length > 0 && (
                    <div className="mt-2">
                      {p.Tags.map((t, i) => (
                        <span
                          key={i}
                          className="badge bg-secondary me-1"
                        >
                          #{t.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3">
                    <Link to={`/post/${p.id}`} className="btn btn-outline-primary btn-sm">
                      Ver más
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
