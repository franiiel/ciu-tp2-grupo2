// src/components/GetPost.tsx
import { type Publicacion, type Comment} from "./types";

const API_URL = "http://localhost:3001";

// Obtener todas las publicaciones del backend
export async function getPublicaciones(): Promise<Publicacion[]> {
  try {
    const res = await fetch(`${API_URL}/posts`);
    if (!res.ok) throw new Error("Error al obtener publicaciones");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en getPublicaciones:", error);
    throw error;
  }
}

// Obtener publicaciones por id
export async function getPublicacionesById(userId: number | null): Promise<Publicacion[] | null> {
  if (userId == null) return null;

  try {
    const res = await fetch(`${API_URL}/posts?userId=${userId}`);
    if (!res.ok) throw new Error("Error al obtener las publicaciones");

    const data: Publicacion[] = await res.json();
    return data;
  } catch {
    throw new Error("Error al obtener las publicaciones");
  }
}

export async function getCommentsByPostId(postId: number): Promise<Comment[]> {
  try {
    const res = await fetch(`${API_URL}/comments/post/${postId}`);
    if (!res.ok) throw new Error("Error al obtener los comentarios");
    const data: Comment[] = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}