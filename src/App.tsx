import { Navigate, Route, Routes } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Usuario from "./pages/Usuario"
import NavigationBar from "./components/Navbar"
import CrearPost from "./pages/CrearPost"
import Footer from "./components/Footer"
import Login from "./pages/Login"

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/usuario/" element={<Usuario />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/crearPost" element={<CrearPost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
