import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, NavLink } from "react-router-dom";
import SearhPeople from "./SearhPeople";

const Header = () => {
    const user = useSelector((state) => state.userSlice);

    const first_name = user?.censu?.firstName;

    const last_name = user?.censu?.lastName;

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
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Navbar Search */}
                    <SearhPeople />
                    <li className="nav-item dropdown user-menu">
                        <a
                            href="#"
                            className="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                        >
                            <img
                                src={`${
                                    import.meta.env.VITE_API_SERVER
                                }/api/v1/images/pic/mun/${
                                    user?.censu.municipality
                                }/${user?.censu.citizenID}`}
                                alt={user?.censu?.firstName}
                                className="user-image img-circle elevation-2"
                            />
                            <span className="d-none d-md-inline">
                                {first_name} {last_name}
                            </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            {/* User image */}
                            <li className="user-header bg-primary">
                                <img
                                    src={`${
                                        import.meta.env.VITE_API_SERVER
                                    }/api/v1/images/pic/mun/${
                                        user?.censu.municipality
                                    }/${user?.censu.citizenID}`}
                                    alt={user?.censu?.firstName}
                                    className="img-circle elevation-2"
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
