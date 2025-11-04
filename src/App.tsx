import { Navigate, Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import NavigationBar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; 
//import buscar
import CrearPost from "./pages/CrearPost";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registrarse from "./pages/Registrarse";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetalle from "./pages/PostDetalle";
import "./App.css";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <NavigationBar />
      <Sidebar /> 

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Inicio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crearPost"
            element={
              <ProtectedRoute>
                <CrearPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostDetalle />
              </ProtectedRoute>
            }
          />
                <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/registrarse"
            element={
              <PublicRoute>
                <Registrarse />
              </PublicRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </AuthProvider>
  );
}

export default App;
