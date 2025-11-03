import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/authContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  if (user === undefined) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
