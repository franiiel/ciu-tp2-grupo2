import { Navigate, Route, Routes, useLocation } from "react-router-dom";
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
import PostDetalle from "./pages/PostDetalle";
import "./App.css";

function AppContent() {
  const location = useLocation();

  // rutas donde NO se muestran las barras
  const hideNavAndSidebar = ["/login", "/registrarse"];
  const shouldHide = hideNavAndSidebar.includes(location.pathname);

  return (
    <>
      {!shouldHide && <NavigationBar />}
      {!shouldHide && <Sidebar />}

      <div className={`main-content ${shouldHide ? "no-bars" : ""}`}>
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
          {/* 🔓 Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />

          {/* Redirección si no coincide */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;