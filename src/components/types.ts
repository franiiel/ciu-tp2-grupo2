export type Publicacion = {
  idPost: number;
  description: string;
  Tags: { name: string }[];
  User: { idUser: number; nickName: string };
  createdAt?: string;
};


export type User = {
  id: number;
  nombre: string;
  nickName: string;
  email: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: {
    id: number;
    nombre: string;
    email: string;
  };
};
export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  User: {
    id: number;
    nickName: string;
    email: string;
  };
}