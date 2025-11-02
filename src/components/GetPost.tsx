// src/components/GetPost.tsx
export type Publicacion = {
  idPost: number;
  description: string;
  Images: { imageUrl: string }[];
  Tags: { name: string }[];
  User: { idUser: number; nickName: string };
  Comments?: { idComment: number }[];
  createdAt?: string;
};

// Obtener todas las publicaciones del backend
export async function getPublicaciones(): Promise<Publicacion[]> {
  try {
    const res = await fetch("http://localhost:3050/posts");
    if (!res.ok) throw new Error("Error al obtener publicaciones");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error en getPublicaciones:", error);
    throw error;
  }
}
