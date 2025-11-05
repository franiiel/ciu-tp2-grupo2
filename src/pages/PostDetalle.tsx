/* eslint-disable @typescript-eslint/no-explicit-any */
import "./../styles/postDetalle.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getImagesByPostId } from "../components/GetPost";
import type { Publicacion, Comment } from "../components/types";
import { useAuth } from "../components/AuthContext";

const API_URL = "http://localhost:3001";
type PublicacionConImagenes = Publicacion & {
  Images?: { id: number; imageUrl: string }[];
};

export default function PostDetalle() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PublicacionConImagenes | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState(""); 
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/posts/${id}`);
        if (!res.ok) throw new Error("Error al obtener el post");
        const data = await res.json();
        const images = await getImagesByPostId(Number(id));

        const normalizedPost: PublicacionConImagenes = {
          id: data.id,
          description: data.description,
          createdAt: data.createdAt,
          User: {
            id: data.User.id,
            nickName: data.User.nickName,
          },
          Tags: data.Tags?.map((t: any) => ({ name: t.name })) || [],
          Images: images.map((img: any) => ({
            id: img.id,
            imageUrl: img.url,
          })),
        };

        setPost(normalizedPost);
      } catch (error) {
        console.error("Error al obtener el post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_URL}/comments/post/${id}`);
        if (!res.ok) throw new Error("Error al obtener comentarios");
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [id]);

  if (loading)
    return <p className="text-center mt-5">Cargando publicación...</p>;
  if (!post) return <p className="text-center mt-5">No se encontró el post.</p>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          postId: id,       
          userId: user?.id,  
        }),
      });

      if (!res.ok) throw new Error("Error al enviar el comentario");

      const savedComment = await res.json();

      const commentWithUser = {
        ...savedComment,
        User: { id: user?.id, nickName: user?.nickName || "Desconocido" },
      };

      setComments((prev) => [...prev, commentWithUser]);

      setNewComment("");
    } catch (error) {
      console.error("Error al comentar:", error);
    }
};


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
        {new Date(post.createdAt ?? "").toLocaleDateString()}
      </p>
      {post.Tags.length > 0 && (
        <div className="tag-list">
          {post.Tags.map((tag, index) => (
            <span key={index} className="tag-item">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

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

      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-input"
          placeholder="Escribe un comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="btn-comment" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar"}
        </button>
      </form>


      <Link to="/" className="back-button">
        ← Volver al inicio
      </Link>
    </div>
  );
}
