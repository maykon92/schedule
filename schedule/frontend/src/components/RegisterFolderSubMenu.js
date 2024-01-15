import "./Menu.css";

//Router
import { NavLink } from "react-router-dom";

const RegisterFolderSubMenu = ({ onClose }) => {
  return (
    <div className="submenu">
      <NavLink to="/directoryfolder/1" onClick={onClose}>
        Currículos
      </NavLink>
      <NavLink to="/directoryfolder/2" onClick={onClose}>
        Cidadania Italiana
      </NavLink>
      <NavLink to="/directoryfolder/3" onClick={onClose}>
        Documentos
      </NavLink>
      <NavLink to="/directoryfolder/4" onClick={onClose}>
        Itinerário
      </NavLink>
    </div>
  );
};

export default RegisterFolderSubMenu;