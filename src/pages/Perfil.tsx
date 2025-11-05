import React from "react";
import { Container } from "react-bootstrap";
import PerfilHeader from "../components/PerfilHeader";
import UserPostList from "../components/UserPostList";
import { useAuth } from "../components/AuthContext";


const Perfil: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <p>Cargando usuario...</p>; 

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <PerfilHeader
        name={user.nickName}
        avatarUrl={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.nickName}`}
        followers={321}  
        following={185}
      />
      <UserPostList />
    </Container>
  );
};

export default Perfil;