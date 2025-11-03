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
import { AuthProvider } from "./components/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

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
          {/* 🔓 Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />

          {/* Redirección si no coincide */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </AuthProvider>
  );
}

export default App;
