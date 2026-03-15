import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cargando from "../../utils/Cargando";
import getConfig from "../../utils/getConfig";
import RegisteredUser from "../Did/RegisteredUser";
import "./PreRegister.css";

const AdminUserRegister = ({ getAllUsers }) => {
    const [people, setPeople] = useState();
    const [inputsLoader, setInputsLoader] = useState(false);
    const [formLoader, setFormLoader] = useState(false);
    const [showError, setShowError] = useState("");
    const [res, setRes] = useState(false);
    const [message, setMessage] = useState();

    const findingWord = (e) => {
        let fn = e.target.value.trim().replaceAll("-", "");

        if (fn != "" && fn.length == 11) {
            setInputsLoader(true);
            findPeople(fn);
        } else {
            setPeople({ firstName: "", lastName: "" });
        }
    };
    const findPeople = (findWord) => {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/census/simplesearch`;
        axios
            .post(
                URL,
                {
                    findWord: findWord,
                },
                getConfig()
            )
            .then((res) => {
                if (!res.data.data.rows[0]) {
                    setPeople({
                        firstName: "No encontrado",
                        lastName: "No encontrado",
                    });
                } else {
                    setPeople(res.data.data.rows[0]);
                }
                setInputsLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setInputsLoader(false);
            });
    };
    const createNewUser = (e) => {
        e.preventDefault();
        const user = {
            email: people?.citizenID,
            password: people?.citizenID,
            citizenID: people?.citizenID,
            role: 1,
        };
        setFormLoader(true);

        //envio a backend
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/auth/register`;
        axios
            .post(URL, user)
            .then((res) => {
                setFormLoader(false);
                setInputsLoader(false);
                setRes(true);
                getAllUsers();
            })
            .catch((err) => {
                setFormLoader(false);
                setInputsLoader(false);

                setMessage(
                    "Error, asegurese de que el usuario ya no este registrado o contacte con el administrador"
                );
            });
        //fin de envio backend
    };

    const reseting = () => {
        setShowError("");
    };
    if (res) {
        return (
            <>
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a className="h1">
                            <b>Mi Elector</b>
                        </a>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Registrado con exito</p>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            setRes(false), setPeople();
                        }}
                    >
                        Registrar Otro
                    </button>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="row">
                    <div className="col-sm-6">
                        {formLoader ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: "100%",
                                }}
                            >
                                <Cargando escala="1" />
                            </div>
                        ) : (
                            <div className="card card-outline card-primary">
                                <div className="card-header text-center">
                                    <a href="../../index2.html" className="h1">
                                        <b>Registrar un Colaborador</b>
                                    </a>
                                </div>
                                <div className="card-body">
                                    <p className="login-box-msg">
                                        {message ? (
                                            <div className="alert alert-warning alert-dismissible">
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="alert"
                                                    aria-hidden="true"
                                                >
                                                    ×
                                                </button>
                                                <h5>
                                                    <i className="icon fas fa-exclamation-triangle" />{" "}
                                                    Alerta!
                                                </h5>
                                                {message}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </p>
                                    <form onSubmit={createNewUser}>
                                        <div className="row">
                                            <div className="col-2">
                                                <img
                                                    style={{ width: "150px" }}
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_API_SERVER
                                                    }/api/v1/images/pic/mun/${
                                                        people?.municipality
                                                    }/${people?.citizenID}`}
                                                    alt="user-avatar"
                                                    className="img-fluid"
                                                />
                                            </div>
                                            <div className="col-10">
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Cedula"
                                                        onChange={findingWord}
                                                        name="cedula"
                                                        required
                                                    />
                                                    <div className="input-group-append">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-id-card" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Nombre"
                                                        value={
                                                            people?.firstName
                                                        }
                                                    />
                                                    <div
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            right: "10px",
                                                            top: "5px",
                                                        }}
                                                    >
                                                        {inputsLoader ? (
                                                            <Cargando escala="0.5" />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="input-group-append">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-user" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="input-group mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Apellido"
                                                        value={people?.lastName}
                                                    />
                                                    <div
                                                        style={{
                                                            position:
                                                                "absolute",
                                                            right: "10px",
                                                            top: "5px",
                                                        }}
                                                    >
                                                        {inputsLoader ? (
                                                            <Cargando escala="0.5" />
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                    <div className="input-group-append">
                                                        <div className="input-group-text">
                                                            <span className="fas fa-user" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-8">
                                                <div className="icheck-primary">
                                                    <input
                                                        type="checkbox"
                                                        id="agreeTerms"
                                                        name="terms"
                                                        required
                                                    />
                                                    <label htmlFor="agreeTerms">
                                                        Estoy seguro de lo que
                                                        estoy haciendo, al
                                                        registrar este lider.
                                                    </label>
                                                </div>
                                            </div>
                                            {/* /.col */}
                                            <div className="col-4">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block"
                                                >
                                                    Registrar
                                                </button>
                                            </div>
                                            {/* /.col */}
                                        </div>
                                    </form>
                                    <div className="social-auth-links text-center"></div>
                                </div>
                                {/* /.form-box */}
                            </div>
                        )}
                    </div>
                    <div className="col-sm-6">
                        <div className="alert alert-info alert-dismissible">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-hidden="true"
                            >
                                ×
                            </button>
                            <h5>
                                <i className="fas fa-bullhorn"></i> Importante!
                            </h5>
                            <p>
                                Al crear un usuario, esta persona no será
                                notificada, debe avisarle usted mismo luego de
                                completarle el padroncillo, preferiblemente
                                enviar una copia en pdf via whatsapp.
                            </p>
                            <p>
                                Los usuarios se crearan desactivado de forma
                                automática y tendran una clave genérica definida
                                por el administrador.
                            </p>
                            <p>
                                El nuevo colaborador podrá solicitar restablecer
                                la contraseña su usuario siempre sera su cedula.
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default AdminUserRegister;
