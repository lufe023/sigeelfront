import axios from "axios";
import React, { useEffect, useState } from "react";
import getConfig from "../../utils/getConfig";
import Cargando from "../../utils/Cargando";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import AddTieToLeader from "./AddTieToLeader";

const SEARCH_DEBOUNCE_MS = 450;

const FindAndAddPeople = ({ getMypeople, leaderId, leaderCitizenId }) => {
    const [results, setResults] = useState([]);
    const [count, setCount] = useState(0);
    const [isLoading, setIsloading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const resultActionsStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        padding: "0.75rem 0 0",
        marginTop: "0.5rem",
        borderTop: "1px solid #e9ecef",
    };

    const resultActionGroupStyle = {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "8px",
        maxWidth: "100%",
    };

    const resultBadgeStyle = {
        whiteSpace: "normal",
        textAlign: "center",
    };

    const addPeople = (people, citizenID, leaderId) => {
        const URL = `${
            import.meta.env.VITE_API_SERVER
        }/api/v1/census/addpeopletoother`;
        axios
            .post(
                URL,
                {
                    peopleId: people,
                    leaderId,
                },
                getConfig()
            )
            .then(() => {
                findPeople(citizenID);
                getMypeople();
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
                    icon: "success",
                    title: "Se agregó una persona a este padroncillo",
                });
            })
            .catch((err) => {
                console.error(err);
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 6000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "error",
                    title: `No se pudo agregar`,
                });
            });
    };

    const findPeople = (findWord) => {
        setIsloading(true);
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/search`;
        axios
            .post(
                URL,
                {
                    findWord,
                    page: 1,
                    size: 10,
                },
                getConfig(),
            )
            .then((res) => {
                const payload = res.data?.data;
                const rows = Array.isArray(payload) ? payload : payload?.rows || [];
                const total = res.data?.totalItems ?? payload?.count ?? rows.length;

                setResults(rows);
                setCount(total);
                setIsloading(false);
            })
            .catch((err) => {
                setResults([]);
                setCount(0);
                setIsloading(false);
                console.error(err);
            });
    };
    const findingWord = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const normalizedTerm = searchTerm.trim();

        if (normalizedTerm.length < 3) {
            setIsloading(false);
            setResults([]);
            setCount(0);
            return undefined;
        }

        const debounceId = setTimeout(() => {
            findPeople(normalizedTerm);
        }, SEARCH_DEBOUNCE_MS);

        return () => clearTimeout(debounceId);
    }, [searchTerm]);

    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Buscar y agregar personas</h3>
                <div className="card-tools">
                    {/* button with a dropdown */}
                    <div className="btn-group"></div>
                    <button
                        type="button"
                        className="btn btn-sm"
                        data-card-widget="collapse"
                    >
                        <i className="fas fa-minus" />
                    </button>
                </div>
            </div>
            {/* /.card-header */}
            <div className="card-body">
                <li className="nav-item">
                    <form
                        className="form col-8"
                        style={{ margin: "auto" }}
                        onSubmit={(event) => event.preventDefault()}
                    >
                        <div className="input-group ">
                            <input
                                className="form-control form-control-navbar"
                                placeholder="Nombre, Apellido o Cedula"
                                value={searchTerm}
                                onChange={findingWord}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn input-group-text btn-navbar"
                                    type="submit"
                                >
                                    <i className="fas fa-search" />
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="" style={{ marginTop: "30px" }}>
                        {count ? (
                            <span className="dropdown-item dropdown-header">{`${count} coincidencia`}</span>
                        ) : (
                            ""
                        )}

                      <div className="table-responsive p-2" 
     style={{ maxHeight: '500px', overflow: 'visible' }}>
    {count ? (
        <table className="table table-head-fixed">
                                    <thead></thead>
                                    <tbody>
                                        {results?.map((people) => (
                                            <tr
                                                key={people?.id}
                                                className="people-finding"
                                            >
                                                <td>
                                                    <Link
                                                        to={`/mypeople/${people.id}`}
                                                    >
                                                        <img
                                                            style={{
                                                                float: "left",
                                                                width: "125px",
                                                                marginRight:
                                                                    "5px",
                                                            }}
                                                            src={people?.picture}
                                                            alt={
                                                                people?.firstName
                                                            }
                                                        />
                                                    </Link>
                                                    <ul
                                                        className="demographic-information"
                                                        style={{
                                                            margin: "0",
                                                            padding: "0",
                                                        }}
                                                    >
                                                        <li>
                                                            <Link
                                                                to={`/mypeople/${people.id}`}
                                                            >
                                                                <span>
                                                                    {
                                                                        people?.firstName
                                                                    }{" "}
                                                                    {
                                                                        people?.lastName
                                                                    }{" "}
                                                                    {people?.nickname ? (
                                                                        <small>
                                                                            (
                                                                            {
                                                                                people?.nickname
                                                                            }
                                                                            )
                                                                        </small>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <span></span>
                                                        </li>
                                                        <li>
                                                            <span>{`${people?.citizenID.substr(
                                                                0,
                                                                3
                                                            )}-${people?.citizenID.substr(
                                                                3,
                                                                7
                                                            )}-${people?.citizenID.substr(
                                                                10,
                                                                1
                                                            )}`}</span>
                                                        </li>

                                                        <li>
                                                            Distritto:{" "}
                                                            <span>
                                                                {
                                                                    people
                                                                        ?.districts
                                                                        ?.name
                                                                }{" "}
                                                            </span>{" "}
                                                        <span>
                                                                {
                                                            people?.district
                                                                ?.descripcion
                                                        }{" "}
                                                        </span>
                                                        </li>
                                                        <li>
                                                            Municipio:{" "}
                                                            <span>
                                                                {
                                                                    people
                                                                        ?.municipalities
                                                                        ?.description
                                                                }
                                                            </span>
                                                        </li>
                                                        <li>
                                                            Provincia:{" "}
                                                            <span>
                                                                {
                                                                    people
                                                                        ?.provinces
                                                                        ?.Descripcion
                                                                }{" "}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            Colegio:{" "}
                                                            <span>
                                                                {people?.colegio?.collegeNumber
                                                                    .toString()
                                                                    .padStart(
                                                                        4,
                                                                        "0"
                                                                    )}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <span>
                                                                {
                                                                    people
                                                                        ?.colegio
                                                                        ?.precinctData
                                                                        ?.recintoNombre
                                                                }
                                                            </span>
                                                        </li>
                                                        <li>
                                                            {people.leaders ? (
                                                                <Link
                                                                    to={`/mypeople/${people?.leaders?.censu?.id}`}
                                                                >
                                                                    {
                                                                        people
                                                                            ?.leaders
                                                                            ?.censu
                                                                            ?.firstName
                                                                    }
                                                                </Link>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </li>
                                                    </ul>

                                                    <div
                                                        className="card-footer"
                                                        style={resultActionsStyle}
                                                    >
                                                        <div style={resultActionGroupStyle}>
                                                            {people?.leader ? (
                                                                <Link
                                                                    to={`/mypeople/${people?.leaders?.censu?.id}`}
                                                                    className="btn btn-default"
                                                                >
                                                                    <i className="fas fa-user-check search-tool less"></i>
                                                                </Link>
                                                            ) : (
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() =>
                                                                        addPeople(
                                                                            people.id,
                                                                            people.citizenID,
                                                                            leaderId,
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="fas fa-user-plus search-tool"></i>
                                                                </button>
                                                            )}
                                                            <Link
                                                                to={`/mypeople/${people?.id}`}
                                                            >
                                                                <button className="btn btn-warning">
                                                                    <i className="fas fa-user-edit search-tool"></i>
                                                                </button>
                                                            </Link>
                                                            <AddTieToLeader
                                                                leaderCitizenId={
                                                                    leaderCitizenId
                                                                }
                                                                bCitizenId={
                                                                    people?.citizenID
                                                                }
                                                            />
                                                        </div>

                                                        <div style={resultActionGroupStyle}>
                                                            <span
                                                                className={`badge ${
                                                                    people?.sufragio
                                                                        ?.suffrage
                                                                        ? "bg-success"
                                                                        : "bg-danger"
                                                                }`}
                                                                style={resultBadgeStyle}
                                                            >
                                                                {people?.sufragio
                                                                    ?.suffrage
                                                                    ? "Votó"
                                                                    : "No Votó"}
                                                            </span>
                                                            <span
                                                                className="badge bg-dark"
                                                                style={resultBadgeStyle}
                                                            >
                                                                Posición: {people?.position || "N/D"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>
                                    <h5>Sin resultados</h5>
                                    <p>
                                        Intente buscar por nombre, apellido o
                                        apodo numero de cedula sin los guiones
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="dropdown-divider" />
                        {count ? (
                            <a
                                href="#"
                                className="dropdown-item dropdown-footer"
                            >
                                Ver todos los resultados
                            </a>
                        ) : (
                            ""
                        )}
                        <div className="loading">
                            {isLoading ? <Cargando escala="0.3" /> : ""}
                        </div>
                    </div>
                </li>
            </div>

            {/* /.card-body */}
        </div>
    );
};

export default FindAndAddPeople;
