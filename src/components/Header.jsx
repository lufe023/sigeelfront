import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import SearhPeople from "./SearhPeople";

const Header = () => {

    const DEFAULT_IMAGE = "/img/nobody.jpg";

    const user = useSelector((state) => state.userSlice);
    const first_name = user?.censu?.firstName;
    const last_name = user?.censu?.lastName;
    const userPicture = user?.censu?.picture || DEFAULT_IMAGE;

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            href="#"
                            data-widget="pushmenu"
                            role="button"
                        >
                            <i className="fas fa-bars" />
                        </Link>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link">
                            Panel
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/mypeople" className="nav-link">
                            Padroncillo
                        </NavLink>
                    </li>
                </ul>

                <SearhPeople />
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown user-menu">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                        >
                           <img
                                src={userPicture}
                                alt={first_name || "Usuario"}
                                className="user-image img-circle elevation-2"
                                // 3. Por si la URL de la base de datos da error 404
                                onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                            />
                            <span className="d-none d-md-inline">
                                {first_name} {last_name}
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            {/* User image */}
                            <li className="user-header bg-primary">
                                
                                <img
                                    src={userPicture}
                                    alt={first_name}
                                    className="img-circle elevation-2"
                                    onError={(e) => { e.target.src = DEFAULT_IMAGE; }}
                                />
                                <p>
                                    {first_name} {last_name}
                                    <small>{user?.nivel?.roleName}</small>
                                </p>
                            </li>
                            {/* Menu Body */}

                            {/* Menu Footer*/}
                            <li className="user-footer">
                                <Link
                                    to={`/mypeople/${user?.censu?.id}`}
                                    className="btn btn-default btn-flat"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to="/logout"
                                    className="btn btn-default btn-flat float-right"
                                >
                                    Cerrar Session
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Header;
