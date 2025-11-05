import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Perfil from "./pages/Perfil";
import NavigationBar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; 
import Busqueda from "./pages/Busqueda";
import CrearPost from "./pages/CrearPost";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Registrarse from "./pages/Registrarse";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetalle from "./pages/PostDetalle";
import "./App.css";
import PublicRoute from "./components/PublicRoute";

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
          <Route 
          path="/busqueda" 
          element={
              <ProtectedRoute>
                <Busqueda />
              </ProtectedRoute>} />
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