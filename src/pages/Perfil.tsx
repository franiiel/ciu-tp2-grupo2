import React from "react";
import { Container, Button } from "react-bootstrap";
import PerfilHeader from "../components/PerfilHeader";
import UserPostList from "../components/UserPostList";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Perfil: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  if (!user) return <p>Cargando usuario...</p>; 

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <PerfilHeader
        name={user.nickName}
        avatarUrl={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.nickName}`}
        followers={321}  
        following={185}
      />

      <div className="d-flex justify-content-end mb-3">
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>

      <UserPostList />
    </Container>
  );
};

export default Perfil;