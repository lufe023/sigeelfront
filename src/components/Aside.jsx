import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import getConfig from "../utils/getConfig";
import { setUserData } from "../store/slices/user.slice";
import ScroolTop from "./Miscelaneos/ScroolTop";

const DEFAULT_IMAGE = "/img/nobody.jpg";

const Aside = () => {
    const storeUser = useSelector((state) => state.userSlice);
    const [user, setUser] = useState(storeUser);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const isMainSectionActive =
        pathname === "/dashboard" ||
        pathname.startsWith("/mypeople") ||
        pathname.startsWith("/delegate") ||
        pathname.startsWith("/precints") ||
        pathname.startsWith("/concurrencia") ||
        pathname.startsWith("/tasks") ||
        pathname.startsWith("/teams");

    const isAdminSectionActive =
        pathname.startsWith("/users") ||
        pathname.startsWith("/ballot") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/campains") ||
        pathname.startsWith("/informs");

    const [openMenus, setOpenMenus] = useState({
        main: isMainSectionActive || !isAdminSectionActive,
        admin: isAdminSectionActive,
    });

    const getUserbyId = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/me`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                dispatch(setUserData(res.data));
                setUser(res.data);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getUserbyId();
    }, []);

    useEffect(() => {
        setOpenMenus((current) => ({
            main: isMainSectionActive ? true : current.main,
            admin: isAdminSectionActive ? true : current.admin,
        }));
    }, [isMainSectionActive, isAdminSectionActive]);

    const toggleMenu = (event, menuKey) => {
        event.preventDefault();
        setOpenMenus((current) => ({
            ...current,
            [menuKey]: !current[menuKey],
        }));
    };

    const first_name = user?.censu?.firstName;
    const last_name = user?.censu?.lastName;
    const picture = user?.censu?.picture || DEFAULT_IMAGE;

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <ScroolTop />
            <Link to="/" className="brand-link">
                <img
                    src="img/MIELECTOR-Isotipo-64x75.png"
                    alt="Mi Elector Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight-light">Mi Elector</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={picture}
                            alt={first_name || "Usuario"}
                            onError={(e) => {
                                e.target.src = DEFAULT_IMAGE;
                            }}
                            className="img-circle elevation-2"
                        />
                    </div>
                    <div className="info">
                        <NavLink
                            to={`/mypeople/${user?.censu?.id}`}
                            className="d-block"
                        >
                            {`${first_name} ${last_name}`}
                        </NavLink>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
                        <li className={`nav-item ${openMenus.main ? "menu-open" : ""}`}>
                            <a
                                href="#"
                                className={`nav-link ${
                                    openMenus.main || isMainSectionActive ? "active" : ""
                                }`}
                                onClick={(event) => toggleMenu(event, "main")}
                            >
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Panel Principal
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul
                                className="nav nav-treeview"
                                style={{ display: openMenus.main ? "block" : "none" }}
                            >
                                <li className="nav-item">
                                    <NavLink
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                        to="/dashboard"
                                    >
                                        <i className="fas fa-calendar-check nav-icon"></i>
                                        <p>Panel</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to={`/mypeople/${user?.censu?.id}`}
                                        className="nav-link "
                                    >
                                        <i className="fas fa-user-alt nav-icon"></i>
                                        <p>Perfil</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/mypeople" className="nav-link ">
                                        <i className="fas fa-id-card  nav-icon"></i>
                                        <p>Padroncillo</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/delegate" className="nav-link ">
                                        <i className="fas fa-hotel nav-icon" />
                                        <p> Colegios</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/concurrencia" className="nav-link ">
                                        <i className="fas fa-hotel nav-icon" />
                                        <p> Votacion</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/tasks" className="nav-link ">
                                        <i className="fas fa-tasks  nav-icon"></i>
                                        <p>Tareas</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/teams" className="nav-link">
                                        <i className="fas fa-sitemap" />
                                        <p> Teams</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item"></li>
                            </ul>
                        </li>
                    </ul>

                    <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
                        <li className={`nav-item ${openMenus.admin ? "menu-open" : ""}`}>
                            <a
                                href="#"
                                className={`nav-link ${
                                    openMenus.admin || isAdminSectionActive ? "active" : ""
                                }`}
                                onClick={(event) => toggleMenu(event, "admin")}
                            >
                                <i className="fas fa-lock nav-icon" />
                                <p>
                                    Administracion
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul
                                className="nav nav-treeview"
                                style={{ display: openMenus.admin ? "block" : "none" }}
                            >
                                <li className="nav-item">
                                    <NavLink to="/users" className="nav-link">
                                        <i className="fas fa-users nav-icon" />
                                        <p> Colaboradores</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/ballot" className="nav-link">
                                        <i className="fas fa-book-open nav-icon" />
                                        <p> Boleta</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/admin" className="nav-link">
                                        <i className="fas fa-person-booth nav-icon" />
                                        <p> Registros</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/campains" className="nav-link">
                                        <i className="fas fa-puzzle-piece nav-icon" />
                                        <p> Campanas</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/informs" className="nav-link">
                                        <i className="fas fa-chart-bar nav-icon" />
                                        <p> Informe</p>
                                    </NavLink>
                                </li>
                                  <li className="nav-item">
                                    <NavLink to="/informs/metas" className="nav-link">
                                        <i className="fas fa-medal nav-icon" />
                                        <p> Metas</p>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/informs/metas-por-lider" className="nav-link">
                                        <i className="fas fa-user nav-icon" />
                                        <p> Metas Lideres</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Aside;
