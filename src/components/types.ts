export type Publicacion = {
  idPost: number;
  description: string;
  Images: { imageUrl: string }[];
  Tags: { name: string }[];
  User: { idUser: number; nickName: string };
  Comments?: { idComment: number }[];
  createdAt?: string;
};


export type User = {
  id: number;
  nombre: string;
  nickName: string;
  email: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};
