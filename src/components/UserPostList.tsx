
import React, { useEffect, useState } from "react";
import Post from "./UserPost";
import { getPublicacionesById } from "./GetPost";
import { useAuth } from "../components/AuthContext";
import type { Publicacion } from "./types";

const UserPostList: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPublicacionesById(user.id);
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError("Formato de datos inesperado");
        }
      } catch {
        setError("Error al cargar las publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user]);

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>{error}</p>;
  if (posts.length === 0) return <p>No hay publicaciones</p>;

  return (
    <div className="mt-3">
      {posts.map((post) => (
        <Post
          key={post.idPost}
          post={post}
          avatarUrl={`https://api.dicebear.com/7.x/bottts/svg?seed=${post.User.nickName}`}
        />
      ))}
    </div>
  );
};

export default UserPostList;
