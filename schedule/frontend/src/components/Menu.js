import "./Menu.css";

// Components
import { NavLink } from "react-router-dom";
import {
    BsHouseDoorFill,
    BsFillPersonFill,
    BsFillCameraFill,
    BsAlignTop,
    BsFileEarmarkText
} from "react-icons/bs";

import {
    ImAirplane,
    ImFolder,
    ImExit,
    ImEnter,
    ImFileText
} from "react-icons/im";

// Hooks
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//React 
import { useState, useRef, useEffect } from "react";

// Redux
import { logout, reset } from "../slices/authSlice";

//Pages
import RegisterFolderSubMenu from "./RegisterFolderSubMenu";

const Menu = ({onRouteChange}) => {
    const { auth } = useAuth();
    const { user } = useSelector((state) => state.user);

    const [showSubMenu, setShowSubMenu] = useState(false);
    const [isSubMenuActive, setIsSubMenuActive] = useState(false);
    const submenuRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());

        navigate("/login");
    };

    const handleNavLinkClick = (title) => {
        onRouteChange(title);
        scrollToTop(title);
        setShowSubMenu(false);
        setIsSubMenuActive(false);
    };

    const scrollToTop = (title) => {
        if (!title) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };

    const handleSubMenuToggle = () => {
        setShowSubMenu(!showSubMenu);
    };

    const handleSubMenuClose = () => {
        setShowSubMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isAnchorTag = event.target.tagName !== "A";
            if (isAnchorTag) {
                setShowSubMenu(false);
                setIsSubMenuActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSubMenu]);

    return (
        <nav id="menu">
            <ul id="menu-links">
                {auth ? (
                <>
                    <li>
                        <span className="icon-container" onClick={() => handleNavLinkClick(null)} title="Topo">
                            <BsAlignTop />
                        </span>
                    </li>
                    <li>
                        <NavLink to="/" onClick={() => handleNavLinkClick("Pagina Inicial")}>
                            <span className="icon-container" title="Pagina Inicial">
                                <BsHouseDoorFill />
                            </span>
                        </NavLink>
                    </li>
                    {user && (
                    <li>
                        <NavLink to={`/users/${user._id}`} onClick={() => handleNavLinkClick("Fotos")}>
                        <span className="icon-container" title="Fotos">
                            <BsFillCameraFill />
                        </span>
                        </NavLink>
                    </li>
                    )}
                    <li>
                        <NavLink to="/profile" onClick={() => handleNavLinkClick("Perfil")}>
                            <span className="icon-container" title="Perfil">
                            <BsFillPersonFill />
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/countries" onClick={() => handleNavLinkClick("Itinerário")}>
                            <span className="icon-container" title="Itinerário">
                                <ImAirplane />
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/folder" onClick={() => handleNavLinkClick("Arquivos")}>
                            <span className="icon-container" title="Arquivos">
                                <ImFolder />
                            </span>
                        </NavLink>
                    </li>
                    <li ref={submenuRef}>
                        <div className={`submenu-container ${isSubMenuActive ? 'active' : ''}`}>
                            <span className="icon-container" onClick={() => {
                                                                handleSubMenuToggle();
                                                                setIsSubMenuActive(!isSubMenuActive);
                                                            }} title="Cadastro">
                                <BsFileEarmarkText />
                            </span>
                            {showSubMenu && (
                                <RegisterFolderSubMenu onClose={handleSubMenuClose} />
                            )}
                        </div>
                    </li>
                    <li>
                        <span className="icon-container" onClick={handleLogout} title="Sair">
                            <ImExit />
                        </span>
                    </li>
                </>
                ) : (
                <>
                    {" "}
                    <li>
                        <NavLink to="/login" onClick={() => handleNavLinkClick("Entrar")}>
                            <span className="icon-container" title="Entrar">
                                <ImEnter />
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" onClick={() => handleNavLinkClick("Cadastrar")}>
                            <span className="icon-container" title="Cadastrar">
                                <ImFileText />
                            </span>
                        </NavLink>
                    </li>
                </>
                )}
            </ul>
        </nav>
    );
};

export default Menu;