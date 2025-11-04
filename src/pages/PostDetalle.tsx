import "./../styles/postDetalle.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Tag {
  id: number;
  name: string;
}

interface Image {
  id: number;
  imageUrl: string;
}

interface User {
  id: number;
  nickName: string;
  email: string;
}

interface Comment {
  id: number;
  content: string;
  User: User;
  createdAt: string;
}

interface Post {
  id: number;
  description: string;
  createdAt: string;
  User: User;
  Tags: Tag[];
  Images?: Image[];
}

const PostDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3001/posts/${id}`);
        if (!res.ok) throw new Error("Error al obtener el post");
        const data = await res.json();

        // 🧩 Normalizamos los nombres de campos
        const normalizedPost: Post = {
          id: data.idPost,
          description: data.description,
          createdAt: data.createdAt,
          User: {
            id: data.User.idUser,
            nickName: data.User.nickName,
            email: data.User.email || "",
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Tags: data.Tags.map((t: any, index: number) => ({
            id: index,
            name: t.name,
          })),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Images: data.Images?.map((img: any, index: number) => ({
            id: index,
            imageUrl: img.imageUrl,
          })),
        };

        setPost(normalizedPost);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:3001/comments/post/${id}`);
        if (!res.ok) throw new Error("Error al obtener comentarios");
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [id]);

  if (!post) return <p className="text-center mt-5">Cargando publicación...</p>;

  return (
    <div className="post-detalle-container">
      <h2 className="post-title">Publicación #{post.id}</h2>

      <p className="post-description">{post.description}</p>
      {post.Images && post.Images.length > 0 && (
        <div className="post-images">
          {post.Images.map((img) => (
            <img
              key={img.id}
              src={img.imageUrl}
              alt="Imagen del post"
              className="post-image"
            />
          ))}
        </div>
      )}

      <p className="post-meta">
        Publicado por <strong>{post.User.nickName}</strong> el{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* Etiquetas */}
      {post.Tags.length > 0 && (
        <div className="tag-list">
          {post.Tags.map((tag) => (
            <span key={tag.id} className="tag-item">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Comentarios */}
      <div className="comments-section">
        <h4>Comentarios ({comments.length})</h4>
        {comments.length === 0 ? (
          <p className="no-comments">No hay comentarios aún.</p>
        ) : (
          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c.id} className="comment-item">
                <strong>{c.User?.nickName ?? "Anónimo"}</strong>: {c.content}
              </li>
            ))}
          </ul>
        )}
      </div>

      <form className="comment-form">
        <textarea
          className="comment-input"
          placeholder="Escribe un comentario..."
          required
        />
        <button type="submit" className="btn-comment">
          Enviar
        </button>
      </form>

      <Link to="/" className="back-button">
        ← Volver al inicio
      </Link>
    </div>
  );
};

export default PostDetalle;
