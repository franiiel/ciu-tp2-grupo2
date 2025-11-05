import { useState} from "react";
import type { FC } from "react";
import { NavLink } from "react-router-dom";
import searchIcon from "../assets/iconoBuscar.png";
import moreIcon from "../assets/iconoMas.png";
import settingsIcon from "../assets/iconoConfig.png";
import crearPost from "../assets/crearPublicacion.png"
import inicio from "../assets/iconoInicio.png";
//importar perfil o usar la foto del perfil
import "../styles/sidebar.css";

const Sidebar: FC = () => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <>
      {/* Sidebar escritorio */}
      <div className="sidebar d-none d-lg-flex flex-column justify-content-between">
        <div>
          <NavLink to="/" className="sidebar-link">
            <img src={inicio} alt="Inicio" className="icon" /> Inicio
          </NavLink>
          <NavLink to="/busqueda" className="sidebar-link">
            <img src={searchIcon} alt="Buscar" className="icon" /> Buscar
          </NavLink>
          <NavLink to="/crearPost" className="sidebar-link">
            <img src={crearPost} alt="Crear post" className="icon" /> Crear
          </NavLink>
           <NavLink to="/perfil" className="sidebar-link"> Perfil
          </NavLink>
        </div>

        <div>
          <div
            className="sidebar-link more-link"
            onClick={() => setShowMore(!showMore)}
          >
            <img src={moreIcon} alt="Más" className="icon" /> Más
          </div>
          {showMore && (
            <div className="more-items">
              <NavLink to="/configuracion" className="sidebar-link sub-item">
                <img src={settingsIcon} alt="Configuración" className="icon" /> Configuración
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Barra inferior para móviles */}
      <div className="mobile-bottom-bar d-lg-none d-flex justify-content-around">
        <NavLink to="/" className="bottom-link">
         <img src={inicio} alt="Inicio" className="icon" />
        </NavLink>
        <NavLink to="/Busqueda" className="bottom-link">
          <img src={searchIcon} alt="Buscar" className="icon" />
        </NavLink>
        <NavLink to="/CrearPost" className="bottom-link">
           <img src={crearPost} alt="Crear post" className="icon" />
        </NavLink>
        <div>
          <div
            className="sidebar-link more-link"
            onClick={() => setShowMore(!showMore)}
          >
            <img src={moreIcon} alt="Más" className="icon" />
          </div>
          {showMore && (
            <div className="more-items">
              <NavLink to="/configuracion" className="sidebar-link sub-item">
                <img src={settingsIcon} alt="Configuración" className="icon" /> Configuración
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;