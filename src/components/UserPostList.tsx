import React, { useEffect, useState } from "react";
import Post from "./UserPost";
import { getPublicacionesById } from "./GetPost";
import { useAuth } from "./authContext";

interface PostData {
  nickName: string;
  description: string;
  avatarUrl?: string;
  tagsIds?: number[];
}

const UserPostList: React.FC = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPublicacionesById(user.id);
        if (data) {
          // Normalizamos los datos para que coincidan con las props de UserPost
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const normalized: PostData[] = data.map((p: any) => ({
            nickName: p.nickName || user.nickName,
            description: p.description || p.title || "",
            avatarUrl: p.avatarUrl || "/default-avatar.png",
            tagsIds: p.tagsIds || [],
          }));
          setPosts(normalized);
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
      {posts.map((t, i) => (
        <Post
          key={i}
          nickName={t.nickName}
          description={t.description}
          avatarUrl={`https://api.dicebear.com/7.x/bottts/svg?seed=${User.nickName}`}
          tagsIds={t.tagsIds as [number]} // tu tipo original
        />
      ))}
    </div>
  );
};

export default UserPostList;