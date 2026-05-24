import React, { useEffect } from "react";
import Header from "../Header";
import Aside from "../Aside";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import getConfig from "../../utils/getConfig";

const LockAdmin = ({ setAccess, setPasswordFail, passwordFail, requiredRole }) => {
    const [user, setUser] = useState(useSelector((state) => state.userSlice));
    const [msg, setMsg] = useState();
    const { register, handleSubmit, reset } = useForm();

    const DEFAULT_IMAGE = "/img/nobody.jpg";
    const picture = user?.censu?.picture || DEFAULT_IMAGE;

    // Detectamos si el usuario fue rechazado estrictamente por su rol/permisos
    const isPermissionError = msg === "No cumple con los permisos requeridos para esta sección";

    const getUserbyId = () => {
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/me`;
        axios
            .get(URL, getConfig())
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.error(err);
                setPasswordFail(passwordFail + 1);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                Toast.fire({
                    icon: "error",
                    title: `Contraseña erronea, intentelo de nuevo`,
                });
            });
    };

    useEffect(() => {
        getUserbyId();
    }, []);

    const submit = (data) => {
        // Bloqueamos envíos adicionales por si presionan Enter tras ser rechazados
        if (isPermissionError) return;

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/login`;
        axios
            .post(URL, { password: data.password, email: user?.email })
            .then((res) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                const userRole = res.data.user?.user_role?.id || res.data.user?.role || res.data.nivel;

                let hasPermission = false;

                if (requiredRole === 99) {
                    hasPermission = (userRole === 99);
                } else {
                    hasPermission = (res.data.nivel > 2 || userRole === 3 || userRole === 99);
                }

                if (hasPermission) {
                    setAccess(true);
                    setMsg(null);
                    Toast.fire({
                        icon: "success",
                        title: `Credenciales Correctas, permisos aceptados`,
                    });
                } else {
                    setMsg("No cumple con los permisos requeridos para esta sección");
                    Toast.fire({
                        icon: "error",
                        title: `Credenciales Correctas, pero no autorizado`,
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                setPasswordFail(passwordFail + 1);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
                Toast.fire({
                    icon: "error",
                    title: `Contraseña erronea, intentelo de nuevo`,
                });
            });

        reset({ password: "" });
    };

    return (
        <>
            <Header />
            <Aside />
            <div className="content-wrapper">
                <section className="content">
                    <div className="hold-transition lockscreen">
                        <div
                            style={{
                                height: "90vh",
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div>
                                <div className="lockscreen-logo">
                                    <img
                                        src="img/logo-Mi-elector-Transparente-200x267.png"
                                        alt="Mi Elector Logo"
                                        className="brand-image"
                                        style={{ width: "200px" }}
                                    />
                                </div>

                                {/* Nombre del usuario o cuadro de alerta */}
                                <div className="lockscreen-name" style={{ textAlign: "center" }}>
                                    {msg ? (
                                        <span style={{
                                            color: "red",
                                            fontSize: "13px",
                                            background: "#ffe6e6",
                                            padding: "0.5rem 0.8rem",
                                            borderRadius: "4px",
                                            display: "inline-block",
                                            maxWidth: "320px",
                                            lineHeight: "1.2"
                                        }}>
                                            {msg}
                                        </span>
                                    ) : (
                                        user?.censu?.firstName
                                    )}
                                </div>

                                {/* START LOCK SCREEN ITEM */}
                                <div className="lockscreen-item">
                                    <div className="lockscreen-image">
                                        <img
                                            src={picture}
                                            alt="Administrador"
                                            onError={(e) => {
                                                e.target.src = DEFAULT_IMAGE;
                                            }}
                                        />
                                    </div>

                                    <form
                                        className="lockscreen-credentials"
                                        onSubmit={handleSubmit(submit)}
                                    >
                                        <div className="input-group">
                                            <input
                                                {...register("password")}
                                                autoFocus={!isPermissionError}
                                                id="password"
                                                required={!isPermissionError}
                                                className="form-control"
                                                type="password"
                                                placeholder={isPermissionError ? "Acceso denegado" : "Contraseña"}
                                                autoComplete="new-password"
                                                disabled={isPermissionError}
                                                style={isPermissionError ? { backgroundColor: "#f4f6f9", cursor: "not-allowed" } : {}}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    type="submit"
                                                    className="btn"
                                                    disabled={isPermissionError}
                                                    style={isPermissionError ? { cursor: "not-allowed" } : {}}
                                                >
                                                    <i className={`fas ${isPermissionError ? "fa-ban text-danger" : "fa-arrow-right text-muted"}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>

                                <div className="help-block text-center">
                                    <p style={{ display: "block" }}>
                                        {isPermissionError
                                            ? "Esta cuenta no posee los privilegios requeridos."
                                            : "Se necesita confirmar identidad para acceder a esta área"
                                        }
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Link to="/logout" style={{ fontWeight: "bold" }}>
                                        Iniciar con otro usuario
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default LockAdmin;